export default function probs(itemsToFind, itemsToFindFrom, numberOfTimes, print) {

  function calc(a, b) {
    return (a/b);
  };

  var
  out = calc(itemsToFind.length, itemsToFindFrom.length),
  count = itemsToFindFrom.length;

  for(var prop = 1;prop<numberOfTimes;prop ++) {
    out = (out*calc(itemsToFind.length, itemsToFindFrom.length));
    count = (count*itemsToFindFrom.length);
  };

  if(print) {
    out = `${itemsToFind.length}/${count}`;
  };

  return out;

};
