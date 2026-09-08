package com.coach_sports.gym_app.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {
    private String firstName;
    private String lastName;
    private String dni;
    private String email;
    private String address;
    private String phone;
    private String status;
    private LocalDate joinedDate;
    private UUID subscriptionId;
}
