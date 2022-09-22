import sunsetLogo from '../assets/images/sunset.png'
import birkshireLogo from '../assets/images/birkshire.png'
import pinchBrookLogo from '../assets/images/pinchBrook.png'
import flandersLogo from '../assets/images/flanders.png'


export function formatDate(time) {
    const date = new Date(parseInt(time));
    const dateString = date.toDateString();

    return dateString.split(' ').slice(0, 3).join(' ')
}

export function formatTime(time) {
    const date = new Date(parseInt(time));
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
}

export function getCourseName(courseID) {
    switch (courseID) {
        case 5151:
            return 'Flanders B/W';
        case 9535:
            return 'Flanders R/G';
        case 5150:
            return 'Birkshire Valley';
        case 5153:
            return 'Sunset Valley';
        case 5152:
            return 'Pinch Brook';
        default:
            return 'Undefined Course';
    }
}

export function getCourseLogo(courseID) {
    switch (courseID) {
        case 5151:
            return flandersLogo;
        case 9535:
            return flandersLogo;
        case 5150:
            return birkshireLogo;
        case 5153:
            return sunsetLogo;
        case 5152:
            return pinchBrookLogo;
        default:
            return 'Undefined Course';
    }
}