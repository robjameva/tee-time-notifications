module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    format_hours: (hour, minutes) => {
        switch (hour) {
            case '13':
                return `1:${minutes} PM`
            case '14':
                return `2:${minutes} PM`
            case '15':
                return `3:${minutes} PM`
            case '16':
                return `4:${minutes} PM`
            case '17':
                return `5:${minutes} PM`
            case '18':
                return `6:${minutes} PM`
            case '19':
                return `7:${minutes} PM`
            case '20':
                return `8:${minutes} PM`
            case '21':
                return `9:${minutes} PM`
            case '22':
                return `10:${minutes} PM`
            case '23':
                return `11:${minutes} PM`
            default:
                return `${hour}:${minutes} AM`
        }
    }
}