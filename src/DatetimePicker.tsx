import {
    Button,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Portal,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from "react";
import { DateContent } from "./components/DateContent";
import { TimeContent } from "./components/TimeContent";

interface IDatePickerProps {
    initialValue?: Date;
    accentColor?: string;
    secondaryAccent?: string;
    children: React.ReactNode;
    onChange?: (date: Date) => void;
    showTime?: boolean;
}
export interface DatePickerState {
    selectedDate: Date;
    displayedDate: Date;
    accentColor: string;
    secondaryAccent: string;
    page: "calendar" | "time";
    showTime: boolean;
}
interface IDatePickerContext {
    pickerState: DatePickerState;
    setPickerState: any;
}
export const DatePickerContext = React.createContext<IDatePickerContext>({
    pickerState: {
        selectedDate: new Date(),
        displayedDate: new Date(),
        accentColor: "purple",
        secondaryAccent: "teal",
        page: "calendar",
        showTime: true,
    },
    setPickerState: (state: DatePickerState) => {},
});

export function DatetimePicker({
    initialValue,
    accentColor,
    secondaryAccent,
    children,
    onChange,
    showTime = true,
}: IDatePickerProps): JSX.Element {
    const [pickerState, setPickerState] = useState<DatePickerState>({
        selectedDate: initialValue || new Date(),
        displayedDate: initialValue || new Date(),
        accentColor: accentColor || "purple",
        secondaryAccent: secondaryAccent || "teal",
        page: "calendar",
        showTime: showTime,
    });

    const onChangeRef = useRef(onChange);

    useEffect(() => {
        if (onChangeRef.current) {
            onChangeRef.current(pickerState.selectedDate);
        }
    }, [pickerState.selectedDate]);

    return (
        <DatePickerContext.Provider
            value={{ pickerState: pickerState, setPickerState: setPickerState }}
        >
            <Popover>
                {" "}
                <PopoverTrigger>
                    {children || (
                        <Input
                            w="fit-content"
                            fontWeight={"medium"}
                            color="gray.700"
                            size="md"
                            value={dayjs(pickerState.selectedDate).format(
                                `dddd, MMM D YYYY ${showTime ? "HH:mm" : ""}`
                            )}
                        />
                    )}
                </PopoverTrigger>
                <Portal>
                    <PopoverContent boxShadow={"lg"} rounded="lg">
                        <PopoverArrow></PopoverArrow>
                        <PopoverCloseButton></PopoverCloseButton>
                        <PopoverBody>
                            {pickerState.page === "calendar" ? (
                                <DateContent></DateContent>
                            ) : (
                                <TimeContent></TimeContent>
                            )}
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </DatePickerContext.Provider>
    );
}
