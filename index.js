$(function() {
  setTimeout(function() {
    $.get('./songs.json').then(function(response) {
      let items = response
      items.forEach(i => {
        let $li = $(
          `
					<li>
					<a href="./song.html?id=${i.id}">
					<h3>${i.name}</h3>
					<p>演唱者-专辑</p>
					<svg class="play">
					<use xlink:href="#icon-play-circled"></use>
					</svg>
					</a>
					</li>
					`
        )
        $('#lastestMusic').append($li)
      })
      $('#lastestMusicLoading').remove()
    })
  }, 1000)

  $('.siteNav').on('click', 'ol.tabItems>li', function(e) {
    let $li = $(e.currentTarget).addClass('active')
    $li.siblings().removeClass('active')
    let index = $li.index()
    $li.trigger('tabChange', index)
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
  })

  $('.siteNav').on('tabChange', function(e, index) {
    let $li = $('.tabContent > li').eq(index)
    if($li.attr('data-downloaded') === 'yes'){
      return 
    }
    setTimeout(function(){
      if (index === 1) {
        $.get('./page2.json').then((response)=>{
          $li.text(response.content)
          $li.attr('data-downloaded', 'yes')
        })
      }else if(index === 2){
        return
        $.get('./page3.json').then((response)=>{
          $li.text(response.content)
          $li.attr('data-downloaded', 'yes')
        })
      }
    }, 500)
  })

  let timer = undefined
  $('input#searchSong').on('input', function(e){
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    if(value === ''){return}

    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(function(){
      search(value).then((result)=>{
        timer = undefined
        if(result.length !== 0){
          $('#output').text(result.map((r)=>r.name).join(','))
        }else{
          $('#output').text('没有结果')
        }
      })
    },300)


  })

  function search(keyword){
    console.log('搜索'+keyword)
    return new Promise((resolve, reject)=>{
      var database = [
        { "id": 1, "name":"那些花儿", },
        { "id": 2, "name":"情非得已", },
        { "id": 3, "name":"找自己", },
      ]
      let result = database.filter(function(item){
        return item.name.indexOf(keyword)>=0
      })
      setTimeout(function(){
        console.log('搜到'+keyword+ '的结果')
        resolve(result)
    }, (Math.random()*200 + 1000))
    })
  }
  window.search = search
})
