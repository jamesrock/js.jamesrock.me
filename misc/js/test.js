export default function test(_in, _out) {

  var
  out = `FAIL ${_in} ${_out}`;

  if(_in===_out) {
    out = `PASS ${_in} ${_out}`;
  };

  console.log(out);

  return out;

};
