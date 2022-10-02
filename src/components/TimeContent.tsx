import { CalendarIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { DatePickerContext, DatePickerState } from "../DatetimePicker";
import { TimeHeader } from "./TimeHeader";
import { VerticalCarousel } from "./VerticalCarousel";

export function TimeContent(): JSX.Element {
    const { setPickerState } = useContext(DatePickerContext);
    return (
        <VStack p={2} gap={2}>
            <TimeHeader></TimeHeader>
            <HStack>
                <VerticalCarousel
                    options={Array.from({ length: 12 }, (_, i: number) =>
                        String(i + 1).padStart(2, "0")
                    )}
                ></VerticalCarousel>
                <Text fontSize={"3xl"}>:</Text>
                <VerticalCarousel
                    options={Array.from({ length: 60 }, (_, i: number) =>
                        String(i + 1).padStart(2, "0")
                    )}
                ></VerticalCarousel>
                <VerticalCarousel options={["AM", "PM"]}></VerticalCarousel>
            </HStack>
            <Button
                size={"sm"}
                variant={"outline"}
                rightIcon={<CalendarIcon />}
                onClick={() => {
                    setPickerState((prev: DatePickerState) => {
                        return { ...prev, page: "calendar" };
                    });
                }}
            >
                Edit Date
            </Button>
        </VStack>
    );
}
