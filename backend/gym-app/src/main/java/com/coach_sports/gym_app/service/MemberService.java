package com.coach_sports.gym_app.service;

import com.coach_sports.gym_app.dto.MemberDto;
import com.coach_sports.gym_app.dto.MemberResponseDto;
import com.coach_sports.gym_app.exception.ResourceNotFoundException;
import com.coach_sports.gym_app.mapper.MemberMapper;
import com.coach_sports.gym_app.model.Member;
import com.coach_sports.gym_app.model.Subscription;
import com.coach_sports.gym_app.repository.MemberRepository;
import com.coach_sports.gym_app.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MemberMapper memberMapper;

    @Transactional(readOnly = true)
    public List<MemberResponseDto> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(memberMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public MemberResponseDto getMemberById(UUID id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Miembro no encontrado con ID: " + id));
        return memberMapper.toDto(member);
    }

    @Transactional
    public MemberResponseDto createMember(MemberDto dto) {
        Subscription subscription = null;
        if (dto.getSubscriptionId() != null) {
            subscription = subscriptionRepository.findById(dto.getSubscriptionId())
                    .orElse(null);
        }

        Member member = memberMapper.toEntity(dto, subscription);
        Member savedMember = memberRepository.save(member);
        return memberMapper.toDto(savedMember);
    }

    @Transactional
    public MemberResponseDto updateMember(UUID id, MemberDto dto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Miembro no encontrado con ID: " + id));

        Subscription subscription = member.getSubscription();
        if (dto.getSubscriptionId() != null) {
            subscription = subscriptionRepository.findById(dto.getSubscriptionId())
                    .orElse(subscription);
        }

        memberMapper.updateEntityFromDto(dto, subscription, member);
        Member updatedMember = memberRepository.save(member);
        return memberMapper.toDto(updatedMember);
    }

    @Transactional
    public void deleteMember(UUID id) {
        if (!memberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Miembro no encontrado con ID: " + id);
        }
        memberRepository.deleteById(id);
    }
}
