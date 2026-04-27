/**
 * 首页卡片动态加载配置
 *
 * 使用方法：
 * 1. 在对应的 items 数组中添加帖子URL
 * 2. 页面加载时会自动从这些URL获取数据并填充卡片
 *
 * 配置项说明：
 * - url: 帖子详情页的相对路径
 */

// ============ 首页 Popular Guides 配置 =============
// 修改这三个URL来改变首页显示的指南卡片
const homeGuideItems = [
  { url: './guides/guide-shaft-flex.html' },
  { url: './guides/guide-shaft-weight.html' },
  { url: './guides/guide-graphite-vs-steel.html' }
];

// ============ 首页 Latest Reviews 配置 =============
const homeReviewItems = [
  { url: './reviews/mitsubishi-kuro-kage-black-review.html' },
  { url: './reviews/tensei-av-raw-review.html' },
  { url: './reviews/ventus-tr-review.html' }
];

// ============ 首页 Latest News 配置 =============
const homeNewsItems = [
  { url: './news/news-fujikura-ventus-2025.html' },
  { url: './news/news-mitsubishi-diamana-6th-gen.html' },
  { url: './news/news-hzrdus-gen5.html' }
];

// ============ Guides 页面 Featured Guide 配置 =============
const guidesFeaturedItem = { url: './guides/guide-shaft-flex.html' };

// ============ Reviews 页面 Featured Review 配置 =============
const reviewsFeaturedItem = { url: './reviews/mitsubishi-kuro-kage-black-review.html' };

// ============ News 页面 Featured News 配置 =============
const newsFeaturedItem = { url: './news/news-fujikura-ventus-2025.html' };

// 选择器配置 - 从帖子详情页提取内容的选择器（按优先级排序）
const selectors = {
  // 图片选择器: 多种备选方案
  image: [
    '.article-image img',                    // 主要文章图片
    '.page-header + .article-image img',    // 页头后面的图片
    '.article:first-child img',             // 文章第一张图片
    'img[alt*="Shaft"]',                    // 包含Shaft的图片
    '.article-content img:first-of-type'    // 文章内容第一张图片
  ].join(', '),

  // 标题选择器: 多种备选方案
  title: [
    '.page-header-title-dark',              // 页头深色标题
    '.article-title',                       // 文章标题
    'h1.article-title',                     // h1文章标题
    '.page-header h1'                       // 页头h1
  ].join(', '),

  // 简介选择器: 多种备选方案
  excerpt: [
    '.page-header-description-dark',        // 页头描述
    '.article-description',                 // 文章描述
    '.article-header .article-meta',        // 文章 meta 信息
    '.article-content p:first-of-type'      // 文章第一段
  ].join(', ')
};

// 加载详情页内容并提取数据
async function fetchPostData(url) {
  try {
    console.log('[HomeCards] Fetching:', url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error('[HomeCards] HTTP error:', response.status, url);
      return { url, title: 'Error: ' + response.status, excerpt: '', imageUrl: '', date: '', tag: '' };
    }

    const html = await response.text();
    console.log('[HomeCards] HTML received, length:', html.length);

    // 创建临时DOM解析
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 提取标题 - 尝试多个选择器
    let title = '';
    for (const sel of selectors.title.split(', ')) {
      const el = doc.querySelector(sel.trim());
      if (el && el.textContent.trim()) {
        title = el.textContent.trim();
        console.log('[HomeCards] Title found with selector:', sel.trim(), '| value:', title.substring(0, 50));
        break;
      }
    }

    // 提取简介 - 尝试多个选择器
    let excerpt = '';
    for (const sel of selectors.excerpt.split(', ')) {
      const el = doc.querySelector(sel.trim());
      if (el && el.textContent.trim()) {
        excerpt = el.textContent.trim();
        console.log('[HomeCards] Excerpt found with selector:', sel.trim(), '| value:', excerpt.substring(0, 50));
        break;
      }
    }

    // 提取图片URL - 尝试多个选择器
    let imageUrl = '';
    for (const sel of selectors.image.split(', ')) {
      const el = doc.querySelector(sel.trim());
      if (el && el.src) {
        imageUrl = el.src;
        console.log('[HomeCards] Image found with selector:', sel.trim(), '| src:', imageUrl);
        break;
      }
    }

    // 提取日期
    const dateEl = doc.querySelector('.breadcrumb-dark span:last-child, .article-meta span:nth-child(3), [itemprop="datePublished"]');
    const date = dateEl ? dateEl.textContent.trim() : '';

    // 提取分类标签
    const tagEl = doc.querySelector('.article-category, .article-header .article-category, .card-tag');
    const tag = tagEl ? tagEl.textContent.trim() : '';

    console.log('[HomeCards] Final data:', { title: title ? 'yes' : 'no', excerpt: excerpt ? 'yes' : 'no', image: imageUrl ? 'yes' : 'no' });

    return { url, title, excerpt, imageUrl, date, tag };
  } catch (e) {
    console.error('[HomeCards] Error fetching', url, e);
    return { url, title: 'Error loading', excerpt: '', imageUrl: '', date: '', tag: '' };
  }
}

// 渲染单个卡片
function renderCard(item, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('[HomeCards] Container not found:', containerId);
    return;
  }

  // 清理加载提示
  const loadingMsg = container.querySelector('p[style*="Loading"]');
  if (loadingMsg) {
    loadingMsg.remove();
  }

  const card = document.createElement('article');
  card.className = 'card';

  // 内容安全处理
  const title = item.title || 'Untitled';
  const excerpt = item.excerpt || '';
  const imageUrl = item.imageUrl || '';
  const date = item.date || '';
  const tag = item.tag || 'Article';

  // 处理图片URL - 确保是完整的绝对URL
  let imgTag = '';
  if (imageUrl) {
    // 如果是相对路径，转换为绝对路径
    let finalSrc = imageUrl;
    if (imageUrl.startsWith('../')) {
      // ../imgs/xxx.jpg -> /imgs/xxx.jpg
      finalSrc = imageUrl.replace(/^\.\.\//, '/');
    } else if (imageUrl.startsWith('./')) {
      // ./imgs/xxx.jpg -> /imgs/xxx.jpg
      finalSrc = imageUrl.replace(/^\.\//, '/');
    } else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:') && !imageUrl.startsWith('/')) {
      // imgs/xxx.jpg -> /imgs/xxx.jpg
      finalSrc = '/' + imageUrl;
    }

    console.log('[HomeCards] Image URL transformed:', imageUrl, '->', finalSrc);

    imgTag = `<img src="${finalSrc}" alt="${title}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)'; this.style.display='none'">`;
  } else {
    imgTag = `<div style="background:linear-gradient(135deg,#E8E8E8 0%,#D0D0D0 100%);width:100%;aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;color:#999;">No Image</div>`;
  }

  card.innerHTML = `
    <div class="card-image">
      ${imgTag}
    </div>
    <div class="card-content">
      <span class="card-tag">${tag}</span>
      <h3 class="card-title"><a href="${item.url}">${title}</a></h3>
      <p class="card-excerpt">${excerpt.substring(0, 100)}${excerpt.length > 100 ? '...' : ''}</p>
      ${date ? `<div class="card-meta"><span>${date}</span></div>` : ''}
    </div>
  `;

  container.appendChild(card);
}

// 渲染大型特色卡片（用于分类页面）
function renderFeaturedCard(item, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('[HomeCards] Featured container not found:', containerId);
    return;
  }

  // 清理加载提示
  const loadingMsg = container.querySelector('p[style*="Loading"], .loading-placeholder');
  if (loadingMsg) {
    loadingMsg.remove();
  }

  // 内容安全处理
  const title = item.title || 'Untitled';
  const excerpt = item.excerpt || '';
  const imageUrl = item.imageUrl || '';
  const tag = item.tag || 'Article';

  // 处理图片URL
  let imgTag = '';
  if (imageUrl) {
    let finalSrc = imageUrl;
    if (imageUrl.startsWith('../')) {
      finalSrc = imageUrl.replace('../', './');
    } else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
      finalSrc = './' + imageUrl;
    }

    imgTag = `<img src="${finalSrc}" alt="${title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 400%27%3E%3Crect fill=%27%23E0E0E0%27 width=%27600%27 height=%27400%27/%3E%3Ctext fill=%27%23666%27 font-family=%27Inter%27 font-size=%2724%27 x=%27300%27 y=%27200%27 text-anchor=%27middle%27%3ENo Image%3C/text%3E%3C/svg%3E'">`;
  } else {
    imgTag = `<div style="background:linear-gradient(135deg,#E8E8E8 0%,#D0D0D0 100%);width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#999;font-size:24px;">No Image</div>`;
  }

  // 创建特色卡片HTML
  const featuredHTML = `
    <div class="card" style="display:grid; grid-template-columns:1fr 1fr; gap:0; overflow:hidden;">
      <div class="card-image" style="aspect-ratio:auto; min-height:400px;">
        ${imgTag}
      </div>
      <div class="card-content" style="display:flex; flex-direction:column; justify-content:center; padding:48px;">
        <span class="card-tag">${tag}</span>
        <h2 style="font-size:32px; margin-bottom:16px;">${title}</h2>
        <p style="color:#666; margin-bottom:24px; line-height:1.6;">${excerpt.substring(0, 200)}${excerpt.length > 200 ? '...' : ''}</p>
        <a href="${item.url}" class="btn btn-primary">Read Full Article</a>
      </div>
    </div>
  `;

  container.innerHTML = featuredHTML;
}

// 初始化首页卡片
async function initHomeCards() {
  console.log('[HomeCards] Initializing...');

  // 加载 Guides
  if (document.getElementById('popular-guides-grid')) {
    const grid = document.getElementById('popular-guides-grid');
    grid.innerHTML = ''; // 清空加载提示
    for (const item of homeGuideItems) {
      const data = await fetchPostData(item.url);
      renderCard(data, 'popular-guides-grid');
    }
  }

  // 加载 Reviews
  if (document.getElementById('latest-reviews-grid')) {
    const grid = document.getElementById('latest-reviews-grid');
    grid.innerHTML = ''; // 清空加载提示
    for (const item of homeReviewItems) {
      const data = await fetchPostData(item.url);
      renderCard(data, 'latest-reviews-grid');
    }
  }

  // 加载 News
  if (document.getElementById('latest-news-grid')) {
    const grid = document.getElementById('latest-news-grid');
    grid.innerHTML = ''; // 清空加载提示
    for (const item of homeNewsItems) {
      const data = await fetchPostData(item.url);
      renderCard(data, 'latest-news-grid');
    }
  }
}

// 初始化分类页面特色卡片
async function initFeaturedCards() {
  console.log('[HomeCards] Initializing featured cards...');

  // Guides 页面特色卡片
  if (document.getElementById('featured-guide')) {
    const data = await fetchPostData(guidesFeaturedItem.url);
    renderFeaturedCard(data, 'featured-guide');
  }

  // Reviews 页面特色卡片
  if (document.getElementById('featured-review')) {
    const data = await fetchPostData(reviewsFeaturedItem.url);
    renderFeaturedCard(data, 'featured-review');
  }

  // News 页面特色卡片
  if (document.getElementById('featured-news')) {
    const data = await fetchPostData(newsFeaturedItem.url);
    renderFeaturedCard(data, 'featured-news');
  }
}

// 页面加载完成后初始化
function init() {
  console.log('[HomeCards] Page loaded, initializing...');
  initHomeCards();
  initFeaturedCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}