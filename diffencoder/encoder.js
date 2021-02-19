function encode(base, text) {
  let output = "";
  const base_chars = base.toLowerCase().replace(/[^a-z]+/, '').split("").sort().reverse();
  for (let t of text) {
    const b = base_chars.find((c) => c <= t);
    let o = t;
    if (b && t != b) {
      o = b + parseInt(t.charCodeAt() - b.charCodeAt());
    }
    output += o;
  }
  return output;
}

function decode(text) {
  let output = "";
  let last_a = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[a-zA-Z]/)) {
      output += last_a;
      last_a = text[i];
    } else if (text[i].match(/[\d]/)) {
      let num_str = "";
      while (i < text.length && text[i].match(/[\d]/)) {
        num_str += text[i];
        i++;
      }
      i--;

      output += String.fromCharCode(last_a.charCodeAt() + parseInt(num_str));
      last_a = "";
    }
  }
  return output + last_a;
}

$(document).ready(function () {
  var params = {};
  document.location.search.substr(1).split('&').forEach(function(q){
    var i = q.split('=');
    if (i.length === 2)
      params[i[0].toString()] = i[1].toString();
  });
  
  let has_base = false;
  let has_text = false;
  let has_decode = false;
  if (params.base && params.base.length > 0) {
    has_base = true;
    $("#base-word").val(params.base);
  }

  if (params.text) {
    has_text = true;
    $("#text").val(params.text);
  }

  if (params.decode) {
    has_decode = true;
    $("#output").val(params.decode)
  }

  if (has_base && has_text) {
    $("#output").val(encode(params.base, params.text));
  } else if (has_base && has_decode) {
    $("#text").val(decode(params.decode));
  }

  $("#encode").click(function (ev) {
    ev.preventDefault();
    const base_word = $("#base-word").val();
    const source_text = $("#text").val();
    $("#output").val(encode(base_word, source_text));
  })

  $("#decode").click(function (ev) {
    ev.preventDefault();
    const to_decode = $("#output").val();
    $("#text").val(decode(to_decode));
  });
});