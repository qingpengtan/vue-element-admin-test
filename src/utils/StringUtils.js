

let timer = null;

export default {
    json2FormData(data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return formData;
    },

    checkPhone(phone) {
        let phoneReg = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;
        return phone.match(phoneReg);
    },
    checkPassword(password) {
        let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        return password.match(passwordReg);
    },

    getGroupData(arr, groupName) {
        let newArry = [];
        let tempMap = {};
        if (!arr) return;
        for (let item of arr) {
            if (!tempMap[item[groupName]]) {
                tempMap[item[groupName]] = item;
                item['label'] = item.title;
                let objData = {
                    id: item['id'] + 'a',
                    label: item[groupName],
                    children: [item]
                }
                newArry.push(objData)
            } else {
                for (let newItem of newArry) {
                    if (item[groupName] == newItem["label"]) {
                        item['label'] = item.title;
                        newItem["children"].push(item);
                        break;
                    }
                }
            }
        }
        return newArry
    },

    countDownTime(that) {
        clearInterval(timer);
        timer = setInterval(() => {
            that.btnClass = "btn-disabled";
            that.countDownText = `${that.countTime}秒`;
            if (that.countTime == 0) {
                that.countTime = 61;
                that.countDownText = `重新发送`;
                that.btnClass = "btn-active";
                clearInterval(timer);
            }
            that.countTime--;
        }, 1000);
    },
    deepClone(source) {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'deepClone')
        }
        const targetObj = source.constructor === Array ? [] : {}
        Object.keys(source).forEach(keys => {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = this.deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        })
        return targetObj
    },
    formaterTime(timestamp, format) {
        if (!timestamp) return "";
        if (!format) {
            format = 'yyyy-MM-dd hh:mm:ss'
        }
        timestamp = parseInt(timestamp)
        let realDate = new Date(timestamp)
        function timeFormat(num) {
            return num < 10 ? '0' + num : num
        }
        let date = [
            ['M+', timeFormat(realDate.getMonth() + 1)],
            ['d+', timeFormat(realDate.getDate())],
            ['h+', timeFormat(realDate.getHours())],
            ['m+', timeFormat(realDate.getMinutes())],
            ['s+', timeFormat(realDate.getSeconds())],
            ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
            ['S+', realDate.getMilliseconds()]
        ]
    
        let regYear = new RegExp('(y+)', 'i')
        let reg1 = regYear.exec(format)
        if (reg1) {
            format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
        }
        for (let i = 0; i < date.length; i++) {
            let k = date[i][0]
            let v = date[i][1]
    
            let reg2 = new RegExp('(' + k + ')').exec(format)
            if (reg2) {
                format = format.replace(reg2[1], reg2[1].length == 1
                    ? v : ('00' + v).substring(('' + v).length))
            }
        }
        return format
    },


    filterPrice(amount = 0, digist = 2) {
        amount = parseFloat(amount);
        // amount = amount / 100;
        if (isNaN(amount)) {
            return 0;
        } else if ((amount + '').indexOf('.') == -1) {
            return parseInt(amount)
        } else if (amount == 0) {
            return amount.toFixed(digist);
        } else {
            var strArr = amount.toString().split('.');
            var decimalStr;
            if (strArr[1] == undefined) {
                strArr[1] = '0'.repeat(digist);
            } else if (strArr[1].length < digist) {
                strArr[1] = strArr[1] + '0'.repeat(digist - strArr[1].length);
            }
            decimalStr = strArr[1].substr(0, digist);
            return `${strArr[0]}\.${decimalStr}`;
        }
      }

}