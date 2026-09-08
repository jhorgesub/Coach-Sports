package com.coach_sports.gym_app.service;

import com.coach_sports.gym_app.repository.CheckinRepository;
import com.coach_sports.gym_app.repository.MemberRepository;
import com.coach_sports.gym_app.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final MemberRepository memberRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final CheckinRepository checkinRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMembers", memberRepository.count());
        stats.put("totalSubscriptions", subscriptionRepository.count());
        stats.put("totalCheckinsToday", checkinRepository.count());
        return stats;
    }
}
