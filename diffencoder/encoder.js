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

$(document).ready(function () {
  var params = {};
  document.location.search.substr(1).split('&').forEach(function(q){
    var i = q.split('=');
    if (i.length === 2)
      params[i[0].toString()] = i[1].toString();
  });
  
  let has_base = false;
  let has_text = false;
  if (params.base && params.base.length > 0) {
    has_base = true;
    $("#base-word").val(params.base);
  }
  if (params.text) {
    has_text = true;
    $("#text").val(params.text);
  }

  if (has_base && has_text) {
    $("#output").val(encode(params.base, params.text));
  }

  $("#encode").click(function (ev) {
    ev.preventDefault();
    base_word = $("#base-word").val();
    source_text = $("#text").val();
    $("#output").val(encode(base_word, source_text));
  })
});