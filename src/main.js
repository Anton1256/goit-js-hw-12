import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const searchInput = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
    timeout: 3000
  });
}

function showSuccess(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
    timeout: 3000
  });
}

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    showWarning("Please enter a search query");
    return;
  }

  currentQuery = query;
  currentPage = 1;
  hideLoadMoreButton();
  hideEndMessage();

  showLoader();
  clearGallery();

  try {
    const { hits, total } = await getImagesByQuery(currentQuery, currentPage);
    totalHits = total;
    
    if (hits.length === 0) {
      showWarning("there are no images matching your search query. Try again!");
      return;
    }
    
    createGallery(hits);
    showSuccess(`We found ${totalHits} images.`);
    
    if (hits.length < 15 || hits.length >= totalHits) {
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again.',
      position: 'topRight',
      timeout: 3000
    });
    console.error("Error fetching images:", error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    
    createGallery(hits);
    
    if (hits.length < 15 || currentPage * 15 >= totalHits) {
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Try again.',
      position: 'topRight',
      timeout: 3000
    });
    console.error("Error loading more images:", error);
  } finally {
    hideLoader();
  }
}