package com.coach_sports.gym_app.service;

import com.coach_sports.gym_app.dto.SubscriptionDto;
import com.coach_sports.gym_app.dto.SubscriptionResponseDto;
import com.coach_sports.gym_app.exception.ResourceNotFoundException;
import com.coach_sports.gym_app.mapper.SubscriptionMapper;
import com.coach_sports.gym_app.model.Subscription;
import com.coach_sports.gym_app.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionMapper subscriptionMapper;

    @Transactional(readOnly = true)
    public List<SubscriptionResponseDto> getAllSubscriptions() {
        return subscriptionRepository.findAll()
                .stream()
                .map(subscriptionMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public SubscriptionResponseDto getSubscriptionById(UUID id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada con ID: " + id));
        return subscriptionMapper.toDto(subscription);
    }

    @Transactional
    public SubscriptionResponseDto createSubscription(SubscriptionDto dto) {
        Subscription subscription = subscriptionMapper.toEntity(dto);
        Subscription saved = subscriptionRepository.save(subscription);
        return subscriptionMapper.toDto(saved);
    }

    @Transactional
    public SubscriptionResponseDto updateSubscription(UUID id, SubscriptionDto dto) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Suscripción no encontrada con ID: " + id));

        subscriptionMapper.updateEntityFromDto(dto, subscription);
        Subscription updated = subscriptionRepository.save(subscription);
        return subscriptionMapper.toDto(updated);
    }

    @Transactional
    public void deleteSubscription(UUID id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Suscripción no encontrada con ID: " + id);
        }
        subscriptionRepository.deleteById(id);
    }
}
