export const getIntials = (value: string): string => {
    const [firstName, lastName] = value && value.trim().split(' ');
    return `${firstName ? firstName?.charAt(0)?.toUpperCase() : ''} ${lastName ? lastName?.charAt(0)?.toUpperCase() : ''}`
}
