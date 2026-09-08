package com.coach_sports.gym_app.service;

import com.coach_sports.gym_app.dto.CheckinDto;
import com.coach_sports.gym_app.dto.CheckinResponseDto;
import com.coach_sports.gym_app.exception.ResourceNotFoundException;
import com.coach_sports.gym_app.mapper.CheckinMapper;
import com.coach_sports.gym_app.model.Checkin;
import com.coach_sports.gym_app.model.Member;
import com.coach_sports.gym_app.repository.CheckinRepository;
import com.coach_sports.gym_app.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckinService {

    private final CheckinRepository checkinRepository;
    private final MemberRepository memberRepository;
    private final CheckinMapper checkinMapper;

    @Transactional(readOnly = true)
    public List<CheckinResponseDto> getAllCheckins() {
        return checkinRepository.findAll()
                .stream()
                .map(checkinMapper::toDto)
                .toList();
    }

    @Transactional
    public CheckinResponseDto registerCheckin(CheckinDto dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Miembro no encontrado con ID: " + dto.getMemberId()));

        Checkin checkin = Checkin.builder()
                .member(member)
                .checkinTime(LocalDateTime.now())
                .status("Success")
                .build();

        Checkin saved = checkinRepository.save(checkin);
        return checkinMapper.toDto(saved);
    }
}
