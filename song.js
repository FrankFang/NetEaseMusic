$(function(){
	$.get('/lyric.json').then(function(object){
		let {lyric} = object
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string, index){
			let matches = string.match(regex)	
			if(matches){
				return {time: matches[1], words: matches[2]}
			}
		})
		let $lyric = $('.lyric')
		array.map(function(object){
			if(!object){return}
			let $p = $('<p/>')
			$p.attr('data-time', object.time).text(object.words)
			$p.appendTo($lyric.children('.lines'))
		})
	})

	let audio = document.createElement('audio')
	audio.src = 'http://dl.stream.qqmusic.qq.com/C400003o0esZ3dOnu7.m4a?vkey=E6B22D8019DF21E3020B29A0AD42050A71DAD4C887E61B838C5DFCD1A1E31AA5E0F08440671FB81A307DE1FAA8B954BB78F1936BB78551DD&guid=7587493667&uin=0&fromtag=66'
	audio.oncanplay = function(){
		audio.play()
		$('.disc-container').addClass('playing')
	}	
	$('.icon-pause').on('touchstart', function(){
		audio.pause()	
		$('.disc-container').removeClass('playing')
	})
	$('.icon-play').on('touchstart', function(){
		audio.play()	
		$('.disc-container').addClass('playing')
	})
})