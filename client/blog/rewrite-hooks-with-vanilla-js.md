---
title: '바닐라 JS로 구현하는 리액트 훅'
date: '8 26, 2021 16:20'
excerpt: '바닐라 JS로 리액트 훅을 구현해보자'
cover_image: '/images/posts/img3.jpg'
category: 'React, hooks'
author: '열시'
section: 'tech'
author_image: '/images/profile/yeolsi.jpg'
---

<div class="paragraph">
  "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
</div>

<pre class="language-javascript">
  <span class="red"></span>
  <span class="yellow"></span>
  <span class="green"></span>
  <code>
    function getFullName (user) {
        // 윽 추워..
        const fullName = user.firstName + user.lastName;
        return fullName;
    }
  </code>
</pre>