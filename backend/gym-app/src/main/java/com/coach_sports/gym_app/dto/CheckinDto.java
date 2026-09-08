package com.coach_sports.gym_app.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckinDto {
    private UUID memberId;
}
