package com.coach_sports.gym_app.mapper;

import com.coach_sports.gym_app.dto.MemberDto;
import com.coach_sports.gym_app.dto.MemberResponseDto;
import com.coach_sports.gym_app.model.Member;
import com.coach_sports.gym_app.model.Subscription;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    @Mapping(source = "subscription.id", target = "subscriptionId")
    @Mapping(source = "subscription.name", target = "subscriptionName")
    MemberResponseDto toDto(Member member);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "subscription", target = "subscription")
    @Mapping(target = "status", expression = "java(dto.getStatus() != null ? dto.getStatus() : \"Active\")")
    @Mapping(target = "joinedDate", expression = "java(dto.getJoinedDate() != null ? dto.getJoinedDate() : java.time.LocalDate.now())")
    Member toEntity(MemberDto dto, Subscription subscription);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "subscription", target = "subscription")
    void updateEntityFromDto(MemberDto dto, Subscription subscription, @MappingTarget Member member);
}
