package com.coach_sports.gym_app.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    private String billing;

    private Integer membersCount;

    @ElementCollection
    @CollectionTable(name = "subscription_features", joinColumns = @JoinColumn(name = "subscription_id"))
    @Column(name = "feature")
    private List<String> features;
}
