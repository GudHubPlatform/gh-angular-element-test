class GetDropdownValues {

  getDatesPair(name, tense, single) {
    let result = {
      start_date: null,
      end_date: null
    };
    let date = new Date();
    let getPastFutureDatesPair = function(argName, argTense) {
      let sign = null;

      if (argTense === 'past' && argName !== 'year_future' && argName !== 'year_past') {
        sign = -1;
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate()); /*setting current day to 00:00:00*/
        result.end_date = date;
      } else {
        sign = 1;
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1); /*setting current day to 24:00:00*/
        result.start_date = date;
      }

      switch (argName) {
        case 'yesterday':
        case 'tomorrow':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 * sign);
          break;
        case '7_days_past':
        case '7_days_future':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * sign);
          break;
        case '30_days_past':
        case '30_days_future':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 30 * sign);
          break;
        case 'year_past':
          date = new Date(date.getFullYear(), 0, 1);
          result.end_date = date;
          date = new Date(date.getFullYear() - 1, 0, 1);
          break;
        case 'year_future':
          date = new Date(date.getFullYear() + 1, 0, 1);
          result.start_date = date;
          date = new Date(date.getFullYear() + 1, 0, 1);
          break;
      }

      argTense === 'past' ? result.start_date = date : result.end_date = date;
    };

    var getCurrentDatesPair = function(argName) {
      switch (argName) {
        case 'today_current':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
          result.start_date = date;
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1,  date.getHours(), date.getMinutes());
          break;
        case 'today_rounding_current':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          result.start_date = date;
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
          break;
        case 'week_current':
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() - 1);
          result.start_date = date;
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
          break;
        case 'month_current':
          date = new Date(date.getFullYear(), date.getMonth(), 1);
          result.start_date = date;
          date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
          break;
        case 'year_current':
          date = new Date(date.getFullYear(), 0, 1);
          result.start_date = date;
          date = new Date(date.getFullYear() + 1, 0, 1);
          break;
      }
      result.end_date = date;
    };

    let getCurrentDate = function (argName, argTense){
      const sign = argTense === 'past' ? -1 : 1;
      switch (argName){
        case 'yesterday':
        case 'tomorrow':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + sign, date.getHours(), date.getMinutes());
        case 'today_current':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        case '7_days_future':
        case '7_days_past':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * sign, date.getHours(), date.getMinutes());
        case '10_days_future':
        case '10_days_past':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 10 * sign, date.getHours(), date.getMinutes());
        case '14_days_future':
        case '14_days_past':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14 * sign, date.getHours(), date.getMinutes());
        case '30_days_past':
        case '30_days_future':
          return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 30 * sign, date.getHours(), date.getMinutes());
        case 'year_past':
        case 'year_future':
          return new Date(date.getFullYear() + sign, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
      }
    }

  if(single){
    return getCurrentDate(name, tense)
  }else {
    switch (tense) {
      case 'past':
      case 'future':
        getPastFutureDatesPair(name, tense);
        break;
      case 'current':
        getCurrentDatesPair(name);
        break;
      default:
        break;
    }
    return result.start_date.valueOf().toString() + ':' + result.end_date.valueOf().toString();
  }
  }

  getDateDropdownOptions() {
    let result = [];
    let options_catalog = [{
      name: 'Yesterday',
      tense: 'past',
      id: 'yesterday'
    }, {
      name: 'Tomorrow',
      tense: 'future',
      id: 'tomorrow'
    }, {
      name: 'Now',
      tense: 'current',
      id: 'today_current'
    }, {
      name: 'Today',
      tense: 'current',
      id: 'today_rounding_current'
    }, {
      name: 'Current Week',
      tense: 'current',
      id: 'week_current'
    }, {
      name: 'Next 7 days',
      tense: 'future',
      id: '7_days_future'
    }, {
      name: 'Past 7 days',
      tense: 'past',
      id: '7_days_past'
    }, {
      name: 'Current Month',
      tense: 'current',
      id: 'month_current'
    }, {
      name: 'Next 30 days',
      tense: 'future',
      id: '30_days_future'
    }, {
      name: 'Past 30 days',
      tense: 'past',
      id: '30_days_past'
    }, {
      name: 'Current Year',
      tense: 'current',
      id: 'year_current'
    }, {
      name: 'Next Calendar Year',
      tense: 'future',
      id: 'year_future'
    }, {
      name: 'Past Calendar Year',
      tense: 'past',
      id: 'year_past'
    }];

    options_catalog.forEach(item => {
      let resultItem = {
        value: this.getDatesPair(item.id, item.tense),
        name: item.name
      };
      result.push(resultItem);
    })

    return result;
  }

}

export default new GetDropdownValues();