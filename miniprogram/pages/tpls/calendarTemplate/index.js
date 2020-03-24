const conf = {
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = conf.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        'calendar.hasEmptyGrid': true,
        'calendar.empytGrids': empytGrids,
      });
    } else {
      this.setData({
        'calendar.hasEmptyGrid': false,
        'calendar.empytGrids': [],
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = conf.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    this.setData({
      'calendar.days': days,
    });
  },
  handleCalendar(e) {
    var that=this;
    //获取用户id
    var uid = wx.getStorageSync('uid');
    const handle = e.currentTarget.dataset.handle;
    const curYear = that.data.calendar.curYear;
    const curMonth = that.data.calendar.curMonth;
    if (handle === 'prev') {
      let newMonth = curMonth - 1;
      let newYear = curYear;
      if (newMonth < 1) {
        newYear = curYear - 1;
        newMonth = 12;
      }
      conf.calculateDays.call(this, newYear, newMonth);
      conf.calculateEmptyGrids.call(this, newYear, newMonth);

      this.setData({
        'calendar.curYear': newYear,
        'calendar.curMonth': newMonth,
      });
     
      if (newMonth < 10) {
        newMonth = '0' + newMonth;
      }
      let date = newYear + '-' + newMonth;
      //签到列表
      wx.request({
        url: 'https://mypro.51cmo.net/home/qiandao/index/ty/qd/uid/' + uid + '/lsqd/' + date,
        success: function (res) {
          var signList = res.data.data.qd;
          let arr = [];
          let dayArr = that.data.calendar.days;
          for (var i in signList) {
            let addtime = signList[i].addtime;
            var days = addtime.slice(8, );
            if (days.charAt(0) == '0') {
              var days = addtime.slice(9, );
            }
            arr.push(Number(days));
          }
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dayArr.length; j++) {
              if (arr[i] == dayArr[j].day) {
                dayArr[j].choosed = true;
              }
            }
          }
          that.setData({
            "calendar.days": dayArr
          })
        }
      })

    } else {
      let newMonth = Number(curMonth) + 1;
      let newYear = curYear;

      if (newMonth > 12) {
        newYear = Number(curYear) + 1;
        newMonth = 1;
      }

      conf.calculateDays.call(this, newYear, newMonth);
      conf.calculateEmptyGrids.call(this, newYear, newMonth);

      if (newMonth < 10) {
        newMonth = '0' + newMonth;
      }
      let date = newYear + '-' + newMonth;
      //签到列表
      wx.request({
        url: 'https://mypro.51cmo.net/home/qiandao/index/ty/qd/uid/' + uid + '/lsqd/' + date,
        success: function (res) {
          var signList = res.data.data.qd;
          let arr = [];
          let dayArr = that.data.calendar.days;
          for (var i in signList) {
            let addtime = signList[i].addtime;
            var days = addtime.slice(8, );
            if (days.charAt(0) == '0') {
              var days = addtime.slice(9, );
            }
            arr.push(Number(days));
          }
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < dayArr.length; j++) {
              if (arr[i] == dayArr[j].day) {
                dayArr[j].choosed = true;
              }
            }
          }
          that.setData({
            "calendar.days": dayArr
          })
  
        }
      })

      this.setData({
        'calendar.curYear': newYear,
        'calendar.curMonth': newMonth,

      });
    }
  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.calendar.days;
    days[idx].choosed = !days[idx].choosed;
    this.setData({
      'calendar.days': days,
    });
  },
  chooseYearAndMonth() {
    let pickerYear = [];
    let pickerMonth = [];
    for (let i = 1900; i <= 2100; i++) {
      pickerYear.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      pickerMonth.push(i);
    }
    this.setData({
      'calendar.showPicker': true,
    });
  },
};

function _getCurrentPage() {
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[last];
}

export default () => {
  const self = _getCurrentPage();
  const date = new Date();
  const curYear = date.getFullYear();
  const curMonth = date.getMonth() + 1;
  const weeksCh = ['日', '一', '二', '三', '四', '五', '六'];
  self.setData({
    calendar: {
      curYear,
      curMonth,
      weeksCh,
      hasEmptyGrid: false,
    }
  });
  conf.calculateEmptyGrids.call(self, curYear, curMonth);
  conf.calculateDays.call(self, curYear, curMonth);
  self.tapDayItem = conf.tapDayItem.bind(self);
  self.handleCalendar = conf.handleCalendar.bind(self);
  self.chooseYearAndMonth = conf.chooseYearAndMonth.bind(self);
};

