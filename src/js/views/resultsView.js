import { state } from '../model.js';
import View from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found. Please try again!`;
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(bookmark => previewView.render(bookmark, false));
  }
}

export default new ResultsView();
