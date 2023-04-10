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
    },
    get_course_name(id) {
        switch (id) {
            case 5151:
                return `Flanders B/W`
            case 9535:
                return `Flanders R/G`
            case 5150:
                return `Birkshire Valley`
            case 5153:
                return `Sunset Valley`
            case 5152:
                return `Pinch Brook`
            default:
                return `Undefined Course`
        }
    },
    get_course_link(date, course_id, numGolfers) {
        const hasGolfers = numGolfers ? `&golfers=${numGolfers}` : ''

        switch (course_id) {
            case 5151:
                return `https://morris-county-golf.book.teeitup.golf/?course=5151&date=${date}${hasGolfers}`
            case 9535:
                return `https://morris-county-golf.book.teeitup.golf/?course=9535&date=${date}${hasGolfers}`
            case 5150:
                return `https://morris-county-golf.book.teeitup.golf/?course=5150&date=${date}${hasGolfers}`
            case 5153:
                return `https://morris-county-golf.book.teeitup.golf/?course=5153&date=${date}${hasGolfers}`
            case 5152:
                return `https://morris-county-golf.book.teeitup.golf/?course=5152&date=${date}${hasGolfers}`
            default:
                return `Undefined Link`
        }
    },
    format_text(formatted_date, course_name) {
        return `✅ ${formatted_date} is available at ${course_name}`
    }
}