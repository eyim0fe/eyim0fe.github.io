// Case Study Drawer & Multi-Image Gallery Controller
(function() {
  let currentProjectImages = [];
  let currentImageIndex = 0;

  function initCaseStudyViewer() {
    let overlay = document.getElementById('case-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'case-modal-overlay';
      overlay.className = 'case-modal-overlay';
      overlay.innerHTML = `
        <div class="case-drawer" id="case-drawer" role="dialog" aria-modal="true" aria-labelledby="case-drawer-title">
          <div class="case-drawer-header">
            <div>
              <div id="case-drawer-badge" style="margin-bottom: 8px;"></div>
              <h2 id="case-drawer-title" style="font-size: 1.5rem; font-weight: 800; color: var(--navy-900);"></h2>
              <p id="case-drawer-tagline" style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 4px;"></p>
            </div>
            <button class="case-close-btn" id="case-close-btn" aria-label="Close Case Study">✕</button>
          </div>
          
          <div class="case-drawer-body">
            <!-- Dynamic Image Gallery / Single Preview -->
            <div id="case-drawer-preview" class="case-mockup-frame"></div>

            <div>
              <div class="case-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                My Role & Contribution
              </div>
              <p id="case-drawer-role-desc" class="case-section-p"></p>
            </div>

            <div>
              <div class="case-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                The Challenge & Problem
              </div>
              <p id="case-drawer-problem" class="case-section-p"></p>
            </div>

            <div>
              <div class="case-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                The Solution & Approach
              </div>
              <p id="case-drawer-solution" class="case-section-p"></p>
            </div>

            <div>
              <div class="case-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Key Results & Impact
              </div>
              <ul id="case-drawer-impact-list" style="margin-left: 20px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;"></ul>
            </div>

            <div>
              <div class="case-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Technologies & Tools Used
              </div>
              <div id="case-drawer-tech-stack" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;"></div>
            </div>

            <div class="case-actions-bar" id="case-actions-bar"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Event Listeners
      const closeBtn = document.getElementById('case-close-btn');
      closeBtn.addEventListener('click', closeCaseStudy);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeCaseStudy();
      });

      document.addEventListener('keydown', (e) => {
        if (lightboxOpen) {
          if (e.key === 'Escape') {
            closeImageLightbox();
          } else if (e.key === 'ArrowRight') {
            changeLightboxSlide(1);
          } else if (e.key === 'ArrowLeft') {
            changeLightboxSlide(-1);
          }
          return;
        }

        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') {
          closeCaseStudy();
        } else if (e.key === 'ArrowRight') {
          changeGallerySlide(1);
        } else if (e.key === 'ArrowLeft') {
          changeGallerySlide(-1);
        }
      });
    }
  }

  let currentProjectIsMobile = false;
  let currentProjectTitle = '';
  let lightboxOpen = false;

  function isItemPortrait(imgItem) {
    if (!imgItem) return false;
    if (typeof imgItem === 'object') {
      if (imgItem.isPortrait === true || imgItem.isMobile === true || imgItem.aspect === 'portrait' || imgItem.device === 'mobile') {
        return true;
      }
      if (imgItem.isPortrait === false || imgItem.isMobile === false || imgItem.aspect === 'landscape' || imgItem.device === 'desktop') {
        return false;
      }
    }
    return currentProjectIsMobile;
  }

  function updateViewportDOM(src, isPortrait) {
    const viewport = document.getElementById('gallery-viewport-el');
    if (!viewport) return;

    const hasMultiple = currentProjectImages && currentProjectImages.length > 1;
    const prevBtn = hasMultiple ? '<button class="gallery-nav-btn prev" onclick="event.stopPropagation(); window.changeGallerySlide(-1)" aria-label="Previous screenshot">‹</button>' : '';
    const nextBtn = hasMultiple ? '<button class="gallery-nav-btn next" onclick="event.stopPropagation(); window.changeGallerySlide(1)" aria-label="Next screenshot">›</button>' : '';
    const counterBadge = hasMultiple ? `<div class="gallery-counter-badge" id="gallery-counter">${currentImageIndex + 1} / ${currentProjectImages.length}</div>` : '';

    viewport.classList.toggle('mobile-mode', !!isPortrait);
    viewport.onclick = () => window.openImageLightbox(currentImageIndex);

    viewport.innerHTML = `
      ${prevBtn}
      <img id="gallery-active-img" src="${src}" alt="${currentProjectTitle}" />
      <div class="gallery-zoom-hint">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        Click to zoom
      </div>
      ${nextBtn}
      ${counterBadge}
    `;
  }

  function applyPortraitMode(imgSrc, isExplicitPortrait) {
    const viewport = document.getElementById('gallery-viewport-el');
    if (!viewport) return;

    if (isExplicitPortrait === true) {
      updateViewportDOM(imgSrc, true);
      return;
    }

    if (isExplicitPortrait === false) {
      updateViewportDOM(imgSrc, false);
      return;
    }

    const testImg = new Image();
    testImg.onload = function() {
      const isPortrait = testImg.naturalHeight > testImg.naturalWidth * 1.05;
      updateViewportDOM(imgSrc, isPortrait);
    };
    testImg.src = imgSrc;
  }

  function renderGallery(images, projectTitle, isMobile = false) {
    const previewContainer = document.getElementById('case-drawer-preview');
    if (!images || images.length === 0) {
      previewContainer.innerHTML = '';
      return;
    }

    currentProjectImages = images;
    currentProjectIsMobile = isMobile;
    currentProjectTitle = projectTitle;
    currentImageIndex = 0;

    const firstIsPortrait = isItemPortrait(images[0]);

    if (images.length === 1) {
      const imgObj = typeof images[0] === 'string' ? { src: images[0], caption: '' } : images[0];
      previewContainer.innerHTML = `
        <div class="gallery-viewport" id="gallery-viewport-el"></div>
        ${imgObj.caption ? `<div class="gallery-caption">${imgObj.caption}</div>` : ''}
      `;
      applyPortraitMode(imgObj.src, firstIsPortrait);
      return;
    }

    // Multi-Image Gallery Setup
    previewContainer.innerHTML = `
      <div class="gallery-container">
        <div class="gallery-viewport" id="gallery-viewport-el"></div>
        
        <div class="gallery-caption" id="gallery-caption-text">${getImageCaption(images[0])}</div>

        <div class="gallery-thumbs-strip" id="gallery-thumbs">
          ${images.map((img, i) => `
            <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="window.setGallerySlide(${i})" data-index="${i}">
              <img src="${getImageSrc(img)}" alt="${projectTitle} thumbnail ${i+1}" />
            </div>
          `).join('')}
        </div>
      </div>
    `;

    applyPortraitMode(getImageSrc(images[0]), firstIsPortrait);
  }

  function getImageSrc(imgItem) {
    return typeof imgItem === 'string' ? imgItem : imgItem.src;
  }

  function getImageCaption(imgItem) {
    return (typeof imgItem === 'object' && imgItem.caption) ? imgItem.caption : '';
  }

  function changeGallerySlide(direction) {
    if (!currentProjectImages || currentProjectImages.length <= 1) return;
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = currentProjectImages.length - 1;
    if (newIndex >= currentProjectImages.length) newIndex = 0;
    setGallerySlide(newIndex);
  }

  function setGallerySlide(index) {
    if (!currentProjectImages || index < 0 || index >= currentProjectImages.length) return;
    currentImageIndex = index;

    const activeImg = document.getElementById('gallery-active-img');
    const counter = document.getElementById('gallery-counter');
    const caption = document.getElementById('gallery-caption-text');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    const itemSrc = getImageSrc(currentProjectImages[index]);
    const itemIsPortrait = isItemPortrait(currentProjectImages[index]);
    applyPortraitMode(itemSrc, itemIsPortrait);

    if (counter) {
      counter.textContent = `${index + 1} / ${currentProjectImages.length}`;
    }

    if (caption) {
      caption.textContent = getImageCaption(currentProjectImages[index]);
    }

    thumbs.forEach((th, i) => {
      th.classList.toggle('active', i === index);
      if (i === index) {
        th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    if (lightboxOpen) {
      updateLightboxContent(index);
    }
  }

  // =========================================
  // FULLSCREEN IMAGE LIGHTBOX
  // =========================================
  function initLightboxModal() {
    let lb = document.getElementById('image-lightbox-modal');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'image-lightbox-modal';
      lb.className = 'lightbox-modal';
      lb.innerHTML = `
        <button class="lightbox-close-btn" onclick="event.stopPropagation(); window.closeImageLightbox()" aria-label="Close fullscreen preview">✕</button>
        <button class="lightbox-nav-btn prev" id="lb-prev-btn" onclick="event.stopPropagation(); window.changeLightboxSlide(-1)" aria-label="Previous image">‹</button>
        <div class="lightbox-content-wrap" onclick="event.stopPropagation();">
          <img class="lightbox-img" id="lb-active-img" src="" alt="Fullscreen preview" />
          <div class="lightbox-caption" id="lb-caption-text"></div>
        </div>
        <button class="lightbox-nav-btn next" id="lb-next-btn" onclick="event.stopPropagation(); window.changeLightboxSlide(1)" aria-label="Next image">›</button>
      `;

      // Only close if clicking the dark backdrop itself
      lb.addEventListener('click', (e) => {
        if (e.target === lb) {
          closeImageLightbox();
        }
      });

      document.body.appendChild(lb);
    }
    return lb;
  }

  function openImageLightbox(index = 0) {
    const lb = initLightboxModal();
    lightboxOpen = true;
    currentImageIndex = index;
    updateLightboxContent(index);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent(index) {
    if (!currentProjectImages || currentProjectImages.length === 0) return;
    const imgItem = currentProjectImages[index];
    const src = getImageSrc(imgItem);
    const caption = getImageCaption(imgItem);

    const lbImg = document.getElementById('lb-active-img');
    const lbCap = document.getElementById('lb-caption-text');
    const prevBtn = document.getElementById('lb-prev-btn');
    const nextBtn = document.getElementById('lb-next-btn');

    if (lbImg) {
      lbImg.style.opacity = '0.4';
      setTimeout(() => {
        lbImg.src = src;
        lbImg.style.opacity = '1';
      }, 60);
    }
    if (lbCap) lbCap.textContent = caption || currentProjectTitle;

    const showNav = currentProjectImages.length > 1;
    if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';
  }

  function changeLightboxSlide(direction) {
    changeGallerySlide(direction);
  }

  function closeImageLightbox() {
    const lb = document.getElementById('image-lightbox-modal');
    if (lb) {
      lb.classList.remove('open');
    }
    lightboxOpen = false;
    // If case study drawer is still open, keep hidden overflow; otherwise reset
    const drawerOverlay = document.getElementById('case-modal-overlay');
    if (!drawerOverlay || !drawerOverlay.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  function openCaseStudy(projectId) {
    initCaseStudyViewer();
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    const project = data.projects.find(p => p.id === projectId);
    if (!project || !project.caseStudy) return;

    const overlay = document.getElementById('case-modal-overlay');
    const badgeContainer = document.getElementById('case-drawer-badge');
    const title = document.getElementById('case-drawer-title');
    const tagline = document.getElementById('case-drawer-tagline');
    const roleDesc = document.getElementById('case-drawer-role-desc');
    const problem = document.getElementById('case-drawer-problem');
    const solution = document.getElementById('case-drawer-solution');
    const impactList = document.getElementById('case-drawer-impact-list');
    const techStack = document.getElementById('case-drawer-tech-stack');
    const actionsBar = document.getElementById('case-actions-bar');

    // Populate data
    const badgeClass = project.roleType === 'pm' ? 'badge-pm' : (project.roleType === 'engineer' ? 'badge-eng' : 'badge-both');
    const isWip = project.inProgress || project.status === 'in-progress' || project.status === 'In Progress';
    const wipBadge = isWip ? `<span class="badge badge-wip" style="margin-left: 6px;"><span class="wip-dot"></span>In Progress</span>` : '';
    badgeContainer.innerHTML = `<span class="badge ${badgeClass}">${project.roleLabel}</span>${wipBadge}`;
    
    title.textContent = project.title;
    tagline.textContent = project.tagline;
    roleDesc.textContent = project.roleDescription;
    problem.textContent = project.caseStudy.problem;
    solution.textContent = project.caseStudy.solution;

    // Multi-Image Gallery vs Single Image resolution
    const imageList = project.images && project.images.length > 0 
      ? project.images 
      : [project.image];
    const isMobile = project.isMobile || project.device === 'mobile' || project.aspect === 'portrait';
    renderGallery(imageList, project.title, isMobile);

    // Impact list
    if (project.caseStudy.myImpact && project.caseStudy.myImpact.length > 0) {
      impactList.innerHTML = project.caseStudy.myImpact.map(item => `<li>${item}</li>`).join('');
    } else {
      impactList.innerHTML = '';
    }

    // Tech Stack
    techStack.innerHTML = project.stack.map(s => `<span class="badge badge-tech">${s}</span>`).join('');

    // Action buttons
    let actionButtonsHTML = '';
    if (project.liveUrl) {
      actionButtonsHTML += `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Visit Live Demo
        </a>
      `;
    }
    if (project.githubUrl) {
      actionButtonsHTML += `
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Source Code
        </a>
      `;
    }
    actionButtonsHTML += `<button class="btn-outline" onclick="window.closeCaseStudy()">Close</button>`;
    actionsBar.innerHTML = actionButtonsHTML;

    // Show
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    const overlay = document.getElementById('case-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  window.openCaseStudy = openCaseStudy;
  window.closeCaseStudy = closeCaseStudy;
  window.changeGallerySlide = changeGallerySlide;
  window.setGallerySlide = setGallerySlide;
  window.openImageLightbox = openImageLightbox;
  window.closeImageLightbox = closeImageLightbox;
  window.changeLightboxSlide = changeLightboxSlide;
  window.addEventListener('DOMContentLoaded', initCaseStudyViewer);
})();
