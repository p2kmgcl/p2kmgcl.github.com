---
type: post
draft: false
title: Creating a custom <select> element
language: en
date: 2022-05-11
emoji: 🧾
mood: Nervous.
summary: >
  I need to create a <select> input using a custom DropDown element so the
  styles can be changed. In order to decide if that's a good idea or not I have
  investigated about pros and cons.
tags: []
---

Currently, at work, we are implementing some beautiful custom inputs for our
Page Editor (a WYSIWYG editor that is being used inside Liferay). When I found
that I needed to create a custom `<select>` element, I though it would be as
easy as creating a simple dropdown with a bit of JS.

I didn't now how wrong I was until I started investigating about how select
works and which aria-roles could I use to emulate it's behavior. There is no
exact `select` role, but I found that using a combination of `haspopup`,
`listbox` and `option` gives a valid result that can also be made accessible.

![Custom dropdown preview](/uploads/custom-dropdown-preview.png)

This HTML is more or less based on a W3C _collapsible dropdown listbox_ demo
(linked below) with a custom JavaScript implementation to manage keyboard
navigation and some click events.

These are some interesting articles and videos I found during my investigation
(thanks to [Eduardo Allegrini](https://twitter.com/edalgrin) for his help 😄):

- [Accessible Custom Select Dropdowns](https://www.webaxe.org/accessible-custom-select-dropdowns/).
- [Striking a Balance Between Native and Custom Select Elements](https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/).
- [The Future of HTML Controls](https://www.crowdcast.io/e/the-future-of-html/1).
- [ARIA: listbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role).
- [Collapsible Dropdown Listbox Example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html).

### Demo

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/clay-css@2.23.4/lib/css/base.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/clay-css@2.23.4/lib/css/bootstrap.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/clay-css@2.23.4/lib/css/atlas.css"
/>

<style>
  html {
    padding: 2em;
    min-height: 400px;
  }

  #custom-dropdown {
    position: relative;
  }

  #custom-dropdown .form-control {
    position: relative;
  }

  #custom-dropdown .form-control::after {
    content: '▼';
    position: absolute;
    right: 0;
    top: 0;
    padding: 1ch;
    font-size: 0.875em;
    color: inherit;
    opacity: 0.8;
    background: inherit;
  }

  #custom-dropdown .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }

  #custom-dropdown .dropdown-item {
    cursor: pointer;
  }
</style>

<div id="custom-dropdown" class="form-group">
  <input type="hidden" name="option" />
  <span id="label" class="sr-only">Select option:</span>

  <button
    id="button"
    class="form-control text-left"
    type="button"
    aria-haspopup="listbox"
    aria-labelledby="label button"
  ></button>

  <div class="dropdown-menu">
    <ul
      id="listbox"
      class="list-unstyled"
      role="listbox"
      aria-labelledby="label"
    >
      <li
        id="option-a"
        class="dropdown-item"
        role="option"
        data-option-value="option-a"
      >
        Option A
      </li>
      <li
        id="option-b"
        class="dropdown-item"
        role="option"
        data-option-value="option-b"
      >
        Option B
      </li>
      <li
        id="option-c"
        class="dropdown-item"
        role="option"
        data-option-value="option-c"
      >
        Option C
      </li>
      <li
        id="option-d"
        class="dropdown-item"
        role="option"
        data-option-value="option-d"
      >
        Super Option D
      </li>
      <li
        id="option-e"
        class="dropdown-item"
        role="option"
        data-option-value="option-e"
      >
        SuperMega Option E
      </li>
      <li
        id="option-f"
        class="dropdown-item"
        role="option"
        data-option-value="option-f"
      >
        Mega Option F
      </li>
      <li
        id="option-g"
        class="dropdown-item"
        role="option"
        data-option-value="option-g"
      >
        Another Option G
      </li>
      <li
        id="option-h"
        class="dropdown-item"
        role="option"
        data-option-value="option-h"
      >
        Option H
      </li>
      <li
        id="option-i"
        class="dropdown-item"
        role="option"
        data-option-value="option-i"
      >
        Last Option I
      </li>
    </ul>
  </div>
</div>

<script>
  const RAPID_TEXT_DELAY = 300;

  let rapidTextTime = Date.now();
  let rapidText = '';

  const wrapper = document.getElementById('custom-dropdown');
  const input = wrapper.querySelector('input');
  const button = wrapper.querySelector('.form-control');
  const dropdown = wrapper.querySelector('.dropdown-menu');
  const listbox = wrapper.querySelector('.list-unstyled');

  function showDropdown() {
    button.setAttribute('aria-expanded', 'true');
    dropdown.classList.add('show');
  }

  function hideDropdown() {
    button.removeAttribute('aria-expanded');
    dropdown.classList.remove('show');
  }

  function getActiveDesdendant() {
    return document.getElementById(
      listbox.getAttribute('aria-activedescendant'),
    );
  }

  function setActiveDescendant(item) {
    const previousItem = getActiveDesdendant();

    if (previousItem && previousItem !== item) {
      previousItem.classList.remove('active');
      previousItem.removeAttribute('aria-selected');
    }

    button.textContent = item.textContent;
    listbox.setAttribute('aria-activedescendant', item.id);
    input.value = item.dataset.optionValue;

    item.classList.add('active');
    item.setAttribute('aria-selected', 'true');

    item.scrollIntoView({
      block: 'nearest',
    });
  }

  button.addEventListener('click', () => {
    if (button.hasAttribute('aria-expanded')) {
      hideDropdown();
    } else {
      showDropdown();
    }
  });

  button.addEventListener('keydown', (event) => {
    const currentActiveDescendant = getActiveDesdendant();

    // Move through next/previous item by pressing arrow keys.
    // Also expand the dropdown automatically if needed.
    if (event.key === 'ArrowDown') {
      showDropdown();

      setActiveDescendant(
        currentActiveDescendant.nextElementSibling ||
          currentActiveDescendant ||
          listbox.firstElementChild,
      );

      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      showDropdown();

      setActiveDescendant(
        currentActiveDescendant.previousElementSibling ||
          currentActiveDescendant ||
          listbox.firstElementChild,
      );

      event.preventDefault();

      // We can "escape" the dropdown.
    } else if (event.key === 'Escape') {
      hideDropdown();
      button.focus();
      event.preventDefault();

      // Home/End keys should navigate to first/last item.
    } else if (event.key === 'Home') {
      setActiveDescendant(listbox.firstElementChild);
      event.preventDefault();
    } else if (event.key === 'End') {
      setActiveDescendant(listbox.lastElementChild);
      event.preventDefault();

      // We want to support "rapid item navigation", allowing
      // users to type some letters of the desired item and
      // focusing it
    } else if (event.key.length === 1) {
      const now = Date.now();

      if (now - rapidTextTime > RAPID_TEXT_DELAY) {
        rapidText = '';
      }

      rapidText += event.key.toLowerCase();
      rapidTextTime = now;

      const rapidItem = Array.from(listbox.children).find(
        (child) =>
          child.dataset.optionValue &&
          child.textContent.trim().toLowerCase().startsWith(rapidText),
      );

      if (rapidItem) {
        setActiveDescendant(rapidItem);
        event.preventDefault();
      }
    }
  });

  // Allow "clicking" on items without moving focus from
  // the button element.
  listbox.addEventListener('click', (event) => {
    if (event.target.dataset?.optionValue) {
      setActiveDescendant(event.target);
      hideDropdown();
      button.focus();
      event.preventDefault();
    }
  });

  // Simple implementation of "click outside" to remove focus
  // from the dropdown.
  const handleDocumentClick = (event) => {
    if (!document.body.contains(wrapper)) {
      document.removeEventListener('click', handleDocumentClick);
      return;
    }

    if (event.target !== wrapper && !wrapper.contains(event.target)) {
      hideDropdown();
    }
  };

  document.addEventListener('click', handleDocumentClick);

  if (!getActiveDesdendant()) {
    setActiveDescendant(listbox.firstElementChild);
  }
</script>
```
