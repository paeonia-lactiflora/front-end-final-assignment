$(function () {
    // 禁用键盘行为
    function banEventInGuide() {
        $(window).on('keydown keyup', function (e) {
            // 禁用tab切换焦点
            if (e.key === 'Tab') {
                e.stopPropagation()
                e.preventDefault()
            }
        })
    }

    function nextGuide() {
        if ($('#getInGuide').css('display') === 'block') {
            $('#getInGuide').children('button').click()
        } else if ($('#themeGuide').css('display') === 'block') {
            $('#themeGuide').children('button').click()
        } else if ($('#musicGuide').css('display') === 'block') {
            $('#musicGuide').children('button').click()
        } else if ($('#infoGuide').css('display') === 'block') {
            $('#infoGuide').children('button').click()
        }
    }

    // 获取按钮半径
    function getBtnRadius(btn) {
        return btn.outerWidth() / 2
    }

    // 获取按钮圆心上偏移
    function getBtnCenterTopOffset(btn) {
        const btnRadius = getBtnRadius(btn) // 按钮半径
        const btn_top_offset = btn.offset().top // 按钮上偏移
        return btn_top_offset + btnRadius // 圆心上偏移
    }

    // 获取按钮圆心左偏移
    function getBtnCenterLeftOffset(btn) {
        const btnRadius = getBtnRadius(btn) // 按钮半径
        const btn_left_offset = btn.offset().left // 按钮左偏移
        return btn_left_offset + btnRadius // 圆心左偏移
    }

    // 设置slider的偏移量
    function setSliderOffset(nextBtn) {
        $('.btnSlider').css('top', getBtnCenterTopOffset(nextBtn) - getBtnRadius($('.btnSlider')))
        $('.btnSlider').css('left', getBtnCenterLeftOffset(nextBtn) - getBtnRadius($('.btnSlider')))
    }

    // getIn slider init
    function getInSliderInit() {
        // 设置按钮滑块位置在getIn按钮处
        setSliderOffset($('.getInBtn'))

        $('.btnSlider').fadeIn(300)
    }

    function getInGuideInit() {
        // getInGuide 位置
        $('#getInGuide').css('top', parseFloat($('.getInBtn').css('top')) + 70)
        $('#getInGuide').css('left', parseFloat($('.getInBtn').css('left')) - 10)

        $('#getInGuide').fadeIn(300)
    }

    // theme slider init
    function themeGuideInit() {
        // theme Guide 位置
        $('#themeGuide').css('top', parseFloat($('.themeBtn').css('top')) - 140)
        $('#themeGuide').css('left', parseFloat($('.themeBtn').css('left')) - 10)
    }

    // music slider init
    function musicGuideInit() {
        // music Guide 位置
        $('#musicGuide').css('top', parseFloat($('.audioBtn').css('top')) - 140)
        $('#musicGuide').css('left', parseFloat($('.audioBtn').css('left')) - 125)
    }

    // ! info slider init (因为infoBtn外面包了一层tooltip, 所以infoBtn没有top, left, 而是tooltip有)
    function infoGuideInit() {
        // info Guide 位置
        $('#infoGuide').css('top', parseFloat($('.infoBtnTooltip').css('top')) + 70)

        if ($('body').css('overflow') === 'hidden') {
            // 多减去滚动条的宽度
            $('#infoGuide').css('left', parseFloat($('.infoBtnTooltip').css('left')) - 140)
        } else {
            $('#infoGuide').css('left', parseFloat($('.infoBtnTooltip').css('left')) - 125)
        }
    }

    // 新手教程初始化
    function guideInit() {
        // 让getInBtn可见
        $('.getInBtn').addClass('z-index-999')

        getInSliderInit()

        getInGuideInit()
        themeGuideInit()
        musicGuideInit()
        infoGuideInit()
    }

    // 移动圆形滑块
    function moveSliderTo(nextBtn, prevBtn, prevGuide) {
        prevBtn.removeClass('z-index-999')
        prevGuide.fadeOut(300)

        setSliderOffset(nextBtn)

        setTimeout(() => {
            // 等待transition
            nextBtn.addClass('z-index-999')
        }, 300)
    }

    // 清空教程控件
    function clearGuide() {
        // 圆形滑块
        $('.btnSlider').hide()

        // getIn隐藏
        $('.getInBtn').removeClass('z-index-999')
        $('#getInGuide').hide()

        // music隐藏
        $('.audioBtn').removeClass('z-index-999')
        $('#musicGuide').hide()

        // theme隐藏
        $('.themeBtn').removeClass('z-index-999')
        $('#themeGuide').hide()

        // info隐藏
        $('.infoBtnTooltip').removeClass('z-index-999')
        $('#infoGuide').hide()
    }

    ;(function ($) {
        // 设置用户是否浏览过index
        if (!localStorage.getItem('isVisited')) {
            localStorage.setItem('isVisited', true)
            setTimeout(() => {
                $('#guideStartBtn').click()
            }, 300)
        }
    })(jQuery)

    // toast init
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, {
            // autohide: false,
            delay: 4000,
        })
    })

    // 进入新手教程按钮
    $('#guideStartBtn').on('click', function () {
        // 清屏
        clearGuide()

        // 出现黑幕
        $('.guide').show()

        // show toast
        toastList[0].show()

        // 如果toast被隐藏, 则开始教程
        $('.toast').on('hide.bs.toast', function () {
            console.log('hide')
            guideInit()
        })

        setTimeout(() => {
            // 隐藏滚动条, 禁用滚动
            $('body').css('overflow', 'hidden')
            $('body').css('padding-right', '8px') // 这里是保持滚动条的宽度
        }, 400) // 延迟是因为bootstrap的modal按钮会先将body的overflow设为auto

        banEventInGuide()
    })

    // get in next btn
    $('#getInGuide button').click(function () {
        moveSliderTo($('.themeBtn'), $('.getInBtn'), $('#getInGuide'))
        $('#themeGuide').fadeIn(300)
    })

    // theme next btn
    $('#themeGuide button').click(function () {
        moveSliderTo($('.audioBtn'), $('.themeBtn'), $('#themeGuide'))
        $('#musicGuide').fadeIn(300)
    })

    // music next btn
    $('#musicGuide button').click(function () {
        moveSliderTo($('.infoBtnTooltip'), $('.audioBtn'), $('#musicGuide'))
        $('#infoGuide').fadeIn(300)
    })

    // 关闭新手教程按钮
    $('#guideCloseBtn').on('click', function () {
        $('.guide').fadeOut(300)

        clearGuide()

        // 恢复滚动条
        $('body').css('overflow', 'auto')
        $('body').css('padding-right', '0')
    })

    // 在执行指南期间退出modal, 取消 bootstrap modal 滚动条
    $('#modalCloseBtn').click(function () {
        if ($('.guide').css('display') === 'block') {
            setTimeout(() => {
                $('body').css('overflow', 'hidden')
            }, 400)
        }
    })

    // shortcut
    $(window).on({
        keyup: function (e) {
            // 新手教程中的快捷键
            switch (e.key) {
                case 'v':
                    localStorage.removeItem('isVisited')
                    alert('Remove isVisited item successful.')
                    break
                case 'G':
                    $('#guideStartBtn').click()
                    break
                case 'Enter':
                case 'n':
                    nextGuide()
                    break
                case 'c':
                    if ($('#infoGuide').css('display') === 'block') {
                        $('#guideCloseBtn').click()
                    }
                    break
                case 'Escape':
                    if ($('.toast').hasClass('show')) {
                        $('.toast .btn-close').click()
                        return
                    }

                    $('#guideCloseBtn').click()
                    break
            }

            // 新手教程禁用键盘操作
            if ($('.guide').css('display') === 'block') {
                return
            }

            if ($('input,textarea').is(':focus')) {
                return
            }

            switch (e.key) {
                case 'g':
                    $('#getInBtn')[0].click()
                    break
            }
        },
    })
})
