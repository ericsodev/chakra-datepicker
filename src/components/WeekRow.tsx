import { Center, HStack, Text, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext } from "react";
import { DatePickerContext, DatePickerState } from "../DatetimePicker";

interface IWeekRowProps {
    week: number;
}
export function WeekRow({ week }: IWeekRowProps): JSX.Element {
    return (
        <HStack gap="0.05rem">
            {Array.from({ length: 7 }, (x, i) => {
                return <Day key={`day-${i}`} week={week} day={i}></Day>;
            })}
        </HStack>
    );
}

interface IDayProps {
    day: number;
    week: number;
}
function Day({ day, week }: IDayProps): JSX.Element {
    const {
        pickerState: { selectedDate, displayedDate, accentColor },
        setPickerState,
    } = useContext(DatePickerContext);

    const firstDayOfMonth = dayjs(displayedDate).startOf("month").day();
    if (week === 0 && day < firstDayOfMonth) {
        return <Center w="2rem" h="2rem"></Center>;
    }
    const date = dayjs(displayedDate)
        .startOf("month")
        .add(week * 7 + day - firstDayOfMonth, "day");

    if (date.month() > dayjs(displayedDate).month() || date.year() > dayjs(displayedDate).year()) {
        return <Center w="2rem" h="1px"></Center>;
    }
    let color = date.isSame(dayjs(), "day") ? "teal" : "gray";
    if (date.isSame(selectedDate, "day")) color = accentColor;

    return (
        <Center
            onClick={() => {
                setPickerState((prev: DatePickerState) => {
                    return {
                        ...prev,
                        selectedDate: date.toDate(),
                    };
                });
            }}
            w="2rem"
            h="2rem"
            bgColor={`${color}.100`}
            rounded={"md"}
            color={`${color}.600`}
            _hover={{ bgColor: `${color}.200`, color: `${color}.700` }}
            _active={{ bgColor: `${color}.300`, color: `${color}.800` }}
            cursor={"pointer"}
            transitionDuration="150ms"
        >
            <Text fontWeight={"medium"}>{date.format("D")}</Text>
        </Center>
    );
}
