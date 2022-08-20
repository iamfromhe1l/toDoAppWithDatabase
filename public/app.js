const toDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent)
})

const $tasks = document.querySelector('#task-col')
if ($tasks && $tasks.querySelectorAll('.collection-item').length != 1) {
  $tasks.addEventListener('click', event => {
    if (event.target.classList.contains('task-delete')) {
      const id = event.target.dataset.id
      fetch('/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(tasks => {
          if (tasks.length) {
            const html = tasks.map(c => {
              return `
              <li class="collection-item">
                <div class="task-content">
                <div>
                  <h5>${c.title}</h5>
                  <h6 class="date">${c.date}</h6>
                </div>
                  <button type="submit" class="secondary-content btn-flat task-delete" data-id="${c._id}">
                    Удалить
                  </button>            
                </div>
              </li>
              `
            })
            html.push(`
            <li class="collection-item">
              <div>
                <form action="/" method="POST">
                  <input name="title" type="text" class="task-input">
                  <button type="submit" class="secondary-content btn-flat task-remove">
                    Добавить задачу
                  </button>
                </form>
              </div>
            </li>
            `)
            $tasks.innerHTML = html.join('')
            $tasks.querySelectorAll('.date').forEach(node => {
              node.textContent = toDate(node.textContent)
            })
          }
        })
      
    }
  })
} else if ($tasks) {
  $tasks.innerHTML = '<h2 style="text-align: center">Нет задач</h2>' + $tasks.innerHTML
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

M.Tabs.init(document.querySelectorAll('.tabs'));