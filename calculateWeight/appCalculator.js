function tipCalculator(quality,cost){
    let tip;
    switch (quality) {
        case 'bad':
            tip=5;
            break;
            case 'ok':
                tip=15;
                break;
                case 'good':
                    tip=20;
                    break;
                    case 'excellent':
                        tip=30;
                        break;
                        default:
                            tip=18;
                                                    
    }
    return cost * tip / 100;
}

console.log(tipCalculator('good', 100)) //should return 20