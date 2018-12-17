import Vue from 'vue';
import log from 'loglevel'

Vue.directive('scroll-bottom', {
  bind(el, binding) {
    el.addEventListener('scroll', onScrollEnd(binding.value));
  },
  update(el, binding) {
    if (binding.oldValue != null && binding.oldValue !== binding.value) {
      el.removeEventListerner('scroll', binding.oldValue);
      el.addEventListener('scroll', onScrollEnd(binding.value));
    }
  },
  unbind(el) {
    el.removeEventListener('scroll');
  }
});


function onScrollEnd(fn) {
  return function(e) {
    log.debug('scrolled', e.target.scrollY);
    if (e.target.innerHeight + e.target.scrollY > e.target.offsetHeight) {
      fn(e);
    }
  };
}
