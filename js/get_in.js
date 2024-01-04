$(function () {
    'use strict'

    // 快捷键, 方便调试
    $(window).on('keyup', function (e) {
        if ($('input,textarea').is(':focus')) {
            return
        }

        switch (e.key) {
            case 's':
                $('#submitBtn').click()
                break
            case 'c':
                $('#resetBtn').click()
                break
        }
    })

    // 动态生成datalist
    const nationList = [
        '汉族',
        '蒙古族',
        '回族',
        '藏族',
        '维吾尔族',
        '苗族',
        '彝族',
        '壮族',
        '布依族',
        '朝鲜族',
        '满族',
        '侗族',
        '瑶族',
        '白族',
        '土家族',
        '哈尼族',
        '哈萨克族',
        '傣族',
        '黎族',
        '傈僳族',
        '佤族',
        '畲族',
        '高山族',
        '拉祜族',
        '水族',
        '东乡族',
        '纳西族',
        '景颇族',
        '柯尔克孜族',
        '土族',
        '达斡尔族',
        '仫佬族',
        '羌族',
        '布朗族',
        '撒拉族',
        '毛南族',
        '仡佬族',
        '锡伯族',
        '阿昌族',
        '普米族',
        '塔吉克族',
        '怒族',
        '乌孜别克族',
        '俄罗斯族',
        '鄂温克族',
        '德昂族',
        '保安族',
        '裕固族',
        '京族',
        '塔塔尔族',
        '独龙族',
        '鄂伦春族',
        '赫哲族',
        '门巴族',
        '珞巴族',
        '基诺族',
    ]

    const politicsStatusList = [
        '中共党员',
        '中共预备党员',
        '团员',
        '无党派人士',
        '群众',
        '民盟会员',
        '民建会员',
        '农工党党员',
        '致公党党员',
        '九三学社社员',
        '台盟盟员',
        '无党派知识分子',
        '各民主党派成员',
        '民革党员',
        '民进会员',
        '农工党预备党员',
        '致公党预备党员',
        '九三学社预备社员',
        '台盟预备盟员',
        '群众团体成员',
        '民革预备党员',
        '民进预备会员',
    ]

    // 政治面貌
    $(politicsStatusList).each(function (index, value) {
        $('#politicsStatusDatalist').append('<option value="' + value + '"></option>')
    })

    // 民族
    $(nationList).each(function (index, value) {
        $('#nationDatalist').append('<option value="' + value + '"></option>')
    })

    // 爱好复选框选中效果
    $('.hobby+label').on('click', function () {
        $(this).toggleClass('active')
    })

    // 性别单选框选中效果
    $('.genderInput+label').on('click', function () {
        $(this).addClass('active')
        $(this).parent().siblings().children('label').removeClass('active')
    })

    // validation
    function validate(valueBox) {
        // 姓名
        function isNameValid(name) {
            // 是否为中文
            let regex = /^[\u4e00-\u9fa5]+$/
            return regex.test(name)
        }

        // 身份证号码
        function isCardIdValid(cardId) {
            // 身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
            let regex = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
            return regex.test(cardId)
        }

        function isDateValid(date) {
            // 日期, 格式: 1990-03-15
            console.log(date)
            let regex = /^\d{4}-\d{1,2}-\d{1,2}$/
            return regex.test(date)
        }

        // 电话号码
        function isPhoneNumberValid(phoneNumber) {
            // 手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可"
            let regex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
            return regex.test(phoneNumber)
        }

        // 兴趣爱好
        function isHobbiesCountValid() {
            // 至少选择两项
            return $('.hobby:checked').length >= 2 ? true : false
        }

        // 民族
        function isNationValid(nation) {
            // 是否是有效民族
            return nationList.includes(nation)
        }

        // 政治面貌
        function isPoliticsStatusValid(politicsStatus) {
            // 是否是有效政治面貌
            return politicsStatusList.includes(politicsStatus)
        }

        let isDataValid = false

        switch (valueBox.prop('id')) {
            case 'name':
                isDataValid = isNameValid(valueBox.val())
                break
            case 'cardId':
                isDataValid = isCardIdValid(valueBox.val())
                break
            case 'birthday':
                isDataValid = isDateValid(valueBox.val())
                break
            case 'phoneNumber':
                isDataValid = isPhoneNumberValid(valueBox.val())
                break
            case 'nationInput':
                isDataValid = isNationValid(valueBox.val())
                break
            case 'politicsStatusInput':
                isDataValid = isPoliticsStatusValid(valueBox.val())
                break
            case 'male':
            case 'female':
                isDataValid = $('.genderInput:checked').length === 1 ? true : false
                break
            case 'basketball':
            case 'football':
            case 'reading':
            case 'movie':
            case 'music':
                isDataValid = isHobbiesCountValid(valueBox.val())
                break
            default:
                // 非空
                isDataValid = valueBox.val().trim() !== '' ? true : false
        }

        if (isDataValid) {
            // 合法
            // 如果是爱好复选框
            if (valueBox.hasClass('hobby')) {
                $('.hobby').each(function () {
                    $(this).removeClass('is-invalid')
                    $(this).addClass('is-valid')

                    // checkbox大盒子 feedback 处理
                    $('.hobbiesZone').removeClass('is-invalid')
                    $('.hobbiesZone').addClass('is-valid')
                })
            } else if (valueBox.prop('name') === 'gender') {
                // 性别单选框
                $('.genderInput').each(function () {
                    $(this).removeClass('is-invalid')
                    $(this).addClass('is-valid')

                    // gender radio大盒子 feedback 处理
                    $('.genderZone').removeClass('is-invalid')
                    $('.genderZone').addClass('is-valid')
                })
            } else {
                valueBox.removeClass('is-invalid')
                valueBox.addClass('is-valid')
            }
        } else {
            // 非法
            // 如果是爱好复选框
            if (valueBox.hasClass('hobby')) {
                $('.hobby').each(function () {
                    $(this).removeClass('is-valid')
                    $(this).addClass('is-invalid')

                    // checkbox大盒子 feedback 处理
                    $('.hobbiesZone').removeClass('is-valid')
                    $('.hobbiesZone').addClass('is-invalid')
                })
            } else if (valueBox.prop('name') === 'gender') {
                // 性别单选框
                $('.genderInput').each(function () {
                    $(this).removeClass('is-valid')
                    $(this).addClass('is-invalid')

                    // gender radio大盒子 feedback 处理
                    $('.genderZone').removeClass('is-valid')
                    $('.genderZone').addClass('is-invalid')
                })
            } else {
                valueBox.removeClass('is-valid')
                valueBox.addClass('is-invalid')
            }
        }
    }

    // 输入框输入时, 检查数据是否有效
    $('.valueBox').on('input', function () {
        validate($(this))
    })

    // 改变复选框时, 检查选中数量
    $('.hobby').on('change', function () {
        validate($(this))
    })

    // 改变复选框时, 检查选中数量
    $('input[type="gender"]').on('change', function () {
        validate($(this))
    })

    // 表单提交后, 检查每个输入框
    $('form').on('submit', function (e) {
        $('.valueBox').each(function () {
            validate($(this))
        })

        // 如果存在无效输入, 阻止表单提交
        if ($('.valueBox.is-invalid')[0]) {
            e.preventDefault()
            e.stopPropagation()
        }
    })

    // 表单重置后, 删除所有验证样式
    $('form').on('reset', function () {
        $('.valueBox,.genderZone,.hobbiesZone').removeClass('is-valid is-invalid')

        // 单选和复选框
        $('.form-check-label').removeClass('active')
    })

    // datepicker
    $('#birthday')
        .datepicker({
            language: 'zh-CN', //语言
            autoclose: true, //选择后自动关闭
            clearBtn: true, //清除按钮
            format: 'yyyy-mm-dd', //日期格式
            todayBtn: true, //显示今日按钮
            todayHighlight: true, //高亮显示今天的日期
            weekStart: 1, //一周从哪一天开始
            keyboardNavigation: false,
            startDate: new Date().getFullYear() - 150 + '-1-1', // 开始日期 (最大150岁)
            endDate: new Date(),

            // initialDate: new Date(), // ? '2019-10-11 20:15:11',//'2019-10-11 20:15:11'//默认显示的日期时间 ，默认值 (怎么没反应?)
        })
        .on({
            clearDate: function () {
                // 清除日期时, 清除验证样式
                $(this).removeClass('is-valid is-invalid')
            },
            hide: function () {
                // 日历收起时再检查一次日期合法性
                if ($(this).val() != '') {
                    validate($(this))
                }
            },
        })
})
