$(function () {
    // bootstrap tooltip initialization
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /**
     *
     * @param {*} urlsObject
     * @brief 获取随机歌曲链接
     */
    function getRandomSongUrl(urlsObject) {
        const songNames = Object.keys(urlsObject)
        const randomIndex = Math.floor(Math.random() * songNames.length)
        const randomKey = songNames[randomIndex]

        return urlsObject[randomKey]
    }

    // audio player element
    const audioEle = $('#audioPlayer')[0]
    // 播放按钮 jquery object
    const playButton = $('#playButton')

    if (audioEle) {
        // 如果HTML页面上存在audio标签 (这里必须用var, 因为函数需要使用这两个对象)
        var lightThemeSongUrls = {
            YOSEMITE: 'http://music.163.com/song/media/outer/url?id=1854548201.mp3',
            'Chamomile Tea': 'http://music.163.com/song/media/outer/url?id=1308188057.mp3',
            Mournings: 'http://music.163.com/song/media/outer/url?id=1407347189.mp3',
            'Game Over!': 'http://music.163.com/song/media/outer/url?id=865048095.mp3',
        }

        var darkThemeSongUrls = {
            Passionfruit: 'http://music.163.com/song/media/outer/url?id=466343434.mp3',
            'Love Songs': 'http://music.163.com/song/media/outer/url?id=1403699842.mp3',
            'cherry blossom scatter': 'http://music.163.com/song/media/outer/url?id=478029284.mp3',
            sweetly: 'http://music.163.com/song/media/outer/url?id=1827580133.mp3',
        }
    }

    // 播放按钮点击事件
    playButton.click(function () {
        if (audioEle.paused) {
            audioEle.play()
            $('.playSvg').hide()
            $('.pauseSvg').show()
            $(this).attr('data-bs-original-title', '不听歌')
        } else {
            audioEle.pause()
            $('.pauseSvg').hide()
            $('.playSvg').show()
            $(this).attr('data-bs-original-title', '听歌')
        }
    })

    // 页面开始时读取主题属性, 若存在则应用
    ;(function ($) {
        const theme = localStorage.getItem('theme')

        if (theme) {
            $('html').attr('data-theme', theme)

            // 根据当前换好的主题选歌
            if (theme === 'dark') {
                audioEle.src = getRandomSongUrl(darkThemeSongUrls)
            } else {
                audioEle.src = getRandomSongUrl(lightThemeSongUrls)
            }
        } else {
            //  如果是第一次进入页面, 也就是本地存储没有东西, 则默认主题为暗色
            $('html').attr('data-theme', 'dark')
            audioEle.src = getRandomSongUrl(darkThemeSongUrls)
        }
    })(jQuery)

    $(audioEle).on('ended', function () {
        const theme = localStorage.getItem('theme')

        // 根据当前换好的主题选歌
        if (theme === 'dark') {
            audioEle.src = getRandomSongUrl(darkThemeSongUrls)
        } else {
            audioEle.src = getRandomSongUrl(lightThemeSongUrls)
        }
        audioEle.play()
    })

    // 主题按钮点击功能
    $('.themeBtn').on('click', function () {
        // 正在播放歌曲时的切换主题操作 (暂停歌曲)
        audioEle.pause()
        $('.pauseSvg').hide()
        $('.playSvg').show()
        playButton.attr('data-bs-original-title', '听歌')
    })

    $('.sun').click(function () {
        if (audioEle) {
            // 如果HTML页面上存在audio标签
            audioEle.src = getRandomSongUrl(lightThemeSongUrls)
        }

        $('body').attr('data-theme', 'light')
        localStorage.setItem('theme', 'light')

        $(this).hide()
        $('.moon').show()
    })

    $('.moon').click(function () {
        if (audioEle) {
            // 如果HTML页面上存在audio标签
            audioEle.src = getRandomSongUrl(darkThemeSongUrls)
        }

        $('body').attr('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')

        $(this).hide()
        $('.sun').show()
    })

    // home button
    const homeBtn = $('.homeBtn')

    homeBtn.on('click', function () {
        window.location.href = '../index.html'
    })

    // info button
    const infoBtn = $('.infoBtn')

    // shortcut
    $(window).keyup(function (e) {
        // 进入新手教程时, 不允许滚动键盘等行为
        if ($('.guide').css('display') === 'block') {
            return
        }

        if ($('input,textarea').is(':focus')) {
            return
        }

        switch (e.key) {
            case 't':
                if ($('.sun').css('display') === 'block') {
                    $('.sun').click()
                } else {
                    $('.moon').click()
                }
                break
            case 'm':
                playButton.click()
                break
            case 'i':
                infoBtn.click()
                break
            case 'h':
                homeBtn.click()
                break
            case 'd':
                localStorage.removeItem('theme')
                alert('Remove theme localStorage successful!')
                break
        }
    })
})
