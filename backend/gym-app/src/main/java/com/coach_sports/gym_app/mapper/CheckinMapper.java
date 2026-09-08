package com.coach_sports.gym_app.mapper;

import com.coach_sports.gym_app.dto.CheckinResponseDto;
import com.coach_sports.gym_app.model.Checkin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CheckinMapper {

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "member.subscription.name", target = "subscriptionName")
    @Mapping(target = "memberName", expression = "java(checkin.getMember() != null ? (checkin.getMember().getFirstName() + \" \" + checkin.getMember().getLastName()).trim() : null)")
    CheckinResponseDto toDto(Checkin checkin);
}
