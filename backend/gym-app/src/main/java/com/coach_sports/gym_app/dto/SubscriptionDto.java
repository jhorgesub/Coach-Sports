package com.coach_sports.gym_app.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionDto {
    private String name;
    private BigDecimal price;
    private String billing;
    private List<String> features;
}
