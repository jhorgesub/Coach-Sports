package com.coach_sports.gym_app.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckinResponseDto {
    private UUID id;
    private UUID memberId;
    private String memberName;
    private String subscriptionName;
    private LocalDateTime checkinTime;
    private String status;
}
