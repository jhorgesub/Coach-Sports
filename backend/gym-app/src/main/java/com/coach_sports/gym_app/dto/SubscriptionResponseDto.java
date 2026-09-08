package com.coach_sports.gym_app.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionResponseDto {
    private UUID id;
    private String name;
    private BigDecimal price;
    private String billing;
    private Integer membersCount;
    private List<String> features;
}
