$(function () {
    function getRandomSongUrl(urlsObject) {
        const songNames = Object.keys(urlsObject)
        const randomIndex = Math.floor(Math.random() * songNames.length)
        const randomKey = songNames[randomIndex]

        return urlsObject[randomKey]
    }

    // audio player
    const audio = $('#audioPlayer')[0]

    if (audio) {
        // 如果HTML页面上存在audio标签
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

    $('.themeBtn').on('click', function () {
        // 正在播放歌曲时的切换主题操作 (暂停歌曲)
        audio.pause()
        $('.pauseSvg').hide()
        $('.playSvg').show()
    })

    $('.sun').click(function () {
        if (audio) {
            // 如果HTML页面上存在audio标签
            audio.src = getRandomSongUrl(lightThemeSongUrls)
        }

        $('body').attr('data-theme', 'light')
        $(this).hide()
        $('.moon').show()
    })

    $('.moon').click(function () {
        if (audio) {
            // 如果HTML页面上存在audio标签
            audio.src = getRandomSongUrl(darkThemeSongUrls)
        }

        $('body').attr('data-theme', 'dark')
        $(this).hide()
        $('.sun').show()
    })

    // shortcut
    $(window).keyup(function (e) {
        if ($('input,textarea,.glowBtn').is(':focus')) {
            return
        }

        if (e.key !== 's') {
            return
        }

        if ($('.sun').css('display') === 'block') {
            $('.sun').click()
        } else {
            $('.moon').click()
        }
    })
})
