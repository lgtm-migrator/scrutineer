window.onload = function () {
  var stylesheet = document.createElement('style')
  document.head.appendChild(stylesheet)


  var form = document.querySelector('form')
  form.addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT') {
      var hiddenFields = document.querySelectorAll('li[data-subquestion-of=' + e.target.name + ']')
      if (hiddenFields === null) return
      for (var i = 0; i < hiddenFields.length; i++) {
        hiddenFields[i].style.display = e.target.value === 'Yes' ? 'list-item' : 'none'
      }
    }

    updateProgressBar()
  })

  var timeButtons = ['ingress', 'egress']
  for (var i = 0; i < timeButtons.length; i++) {
    var c = timeButtons[i]
    var parent = document.getElementById('js-' + c)
    var btn = document.createElement('a')
    btn.className = ' button'
    btn.innerHTML = 'Insert current time'
    btn.addEventListener('click', function (e) {
      var now = new Date()
      e.target.parentElement.children[1].value = now.toTimeString().slice(0, 8) // FIXME
                                                                // ^^^^^^^^^^^^ this bit is so stupid
    })
    parent.appendChild(btn)
  }
  updateProgressBar()

  window.addEventListener('offline', function (e) {
    if (document.body.className.indexOf(' offline') === -1) {
      document.body.className += ' offline'
    }
  })

  window.addEventListener('online', function () {
    document.body.className = document.body.className.replace(' offline', '')
  })
}

function updateProgressBar () {
  var progbar = document.getElementById('js-progress')
  if (progbar === null) {
    progbar = document.createElement('progress')
    progbar.id = 'js-progress'
    document.getElementById('js-placeholder').appendChild(progbar)
  }
  var inputs = document.querySelectorAll('input')
  var checkCount = {}
  var fieldNames = []
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].offsetHeight > 0) {
      if (fieldNames.indexOf(inputs[i].name) === -1) {
        fieldNames.push(inputs[i].name)
      }
      if (
        inputs[i].checked ||
        (['radio', 'checkbox'].indexOf(inputs[i].type) === -1 && inputs[i].value !== '')
      ) {
        if (checkCount[inputs[i].name]) {
          checkCount[inputs[i].name]++
        } else {
          checkCount[inputs[i].name] = 1
        }
      }
    }
  }
  progbar.setAttribute('max', fieldNames.length.toString())
  progbar.setAttribute('value', Object.keys(checkCount).length.toString())

  if (fieldNames.length <= Object.keys(checkCount).length) {
    if (document.body.className.indexOf(' complete') === -1) {
      document.body.className += ' complete'
    } else {
      document.body.className = document.body.className.replace(' complete', '')
    }
  }
}