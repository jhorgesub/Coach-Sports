package com.coach_sports.gym_app.mapper;

import com.coach_sports.gym_app.dto.SubscriptionDto;
import com.coach_sports.gym_app.dto.SubscriptionResponseDto;
import com.coach_sports.gym_app.model.Subscription;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    SubscriptionResponseDto toDto(Subscription subscription);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "membersCount", constant = "0")
    Subscription toEntity(SubscriptionDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "membersCount", ignore = true)
    void updateEntityFromDto(SubscriptionDto dto, @MappingTarget Subscription subscription);
}
