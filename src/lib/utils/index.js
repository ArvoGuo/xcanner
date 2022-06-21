function percentFormat(num) {
  return (num * 100).toFixed(4)  + "%";
}

function logProgress(index, total, step) {
  if (!step) {
    console.log('Progress: ' + percentFormat(index / total));
    return;
  }
  if (index % step === 0) {
    console.log('Progress: ' + percentFormat(index / total) + ', Current Index: ' + index);
  }
}

module.exports = { logProgress };
