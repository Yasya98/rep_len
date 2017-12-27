var data = [];


$(document).ready(function () {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)

        data.push({ key: key, value: localStorage.getItem(key) })
    }

    renderAllItems()
})


function renderAllItems() {
    for (var i = 0; i < data.length; i++) {
        renderItem(data[i])
    }

    addHandlers();
}


function renderItem(obj) {
    $('.items').append(
    `
    <div class="item">
        <div class="key">${obj.key}</div>
        <div class="value">${obj.value}</div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>
    `)
}


function sortItems() {
    $('.items').children().sort(function(left, right) {
        return $(left).children('.key').text() > $(right).children('.key').text()
    }).appendTo('.items')
}


function addHandlers() {
    $('.edit').on('click', function() {
        var key = $(this).parent().children('.key').text()
        var value = $(this).parent().children('.value').text()

        value = prompt('New value: ', value)

        localStorage.setItem(key, value)

        $(this).parent().children('.value').text(value)
    })

    $('.delete').on('click', function() {
        var key = $(this).parent().children('.key').text()

        localStorage.removeItem(key)

        $(this).parent().remove()
    })

    $('.add').on('click', function() {
        var key = prompt('Enter the key')
        var value = prompt('Enter the value')

        localStorage.setItem(key, value)

        renderItem({ key: key, value: value })

        addHandlers()

        sortItems()
    })
}
