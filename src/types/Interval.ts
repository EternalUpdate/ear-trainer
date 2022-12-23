// following the Tonal.js interval format
export const INTERVALS = [
    "1P",
    "2m",
    "2M",
    "3m",
    "3M",
    "4P",
    "5P",
    "6m",
    "6M",
    "7m",
    "7M",
];

export type Interval = {
    name: string;
    firstNote: string;
    secondNote: string;
}