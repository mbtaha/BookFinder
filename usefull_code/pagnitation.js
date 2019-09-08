function createPagination(_response){
	cleanPagination();
	_totalResults = _response.totalItems;
	//if _startIndex = 0 it means it's the first batch of book data
	//if _totalResults > _maxResults, it means there is more data to be fetched.
	if (_startIndex == 0 && _totalResults>_maxResults){
		_previousIndex = _startIndex;
		_startIndex =_startIndex + _maxResults;
		$("#pagination").prepend("<a href='#' id='next'>Next</a>");
		//create the function to handle a click to the newly added "NEXT" link
		$("#next").click(function() {
			requestBooks(_searchText,_startIndex,_maxResults,_searchType,_orderType);
			$('html, body').animate({ scrollTop: 0 }, 'slow'); //go to the top of the page, smoothly
			event.preventDefault();
		});
	}else{
		// checks if _startIndex is lower than total results and if the itens to display are the same as the maximum results per page
		if (_startIndex !=0 && _startIndex < _totalResults && _response.items.length == _maxResults){
			cleanPagination();
			$("#pagination").prepend("<a href='#' id='previous'>Previous</a><a href='#' id='next'>Next</a>");
			//create the function to handle a click to the newly added "NEXT" link
			$("#next").click(function() {
				_startIndex =_startIndex + _maxResults;
				requestBooks(_searchText,_startIndex,_maxResults,_searchType,_orderType);
				$('html, body').animate({ scrollTop: 0 }, 'slow'); //go to the top of the page, smoothly
				event.preventDefault();
			});
			//create the function to handle a click to the newly added "PREVIOUS" link
			$("#previous").click(function() {
				_startIndex =_startIndex - _maxResults;
				requestBooks(_searchText,_startIndex,_maxResults,_searchType,_orderType);
				$('html, body').animate({ scrollTop: 0 }, 'slow');
				event.preventDefault();
			});
		//when all the other checks fail it means there are no further Books to get. Only the "Previous" link is shown and _startIndex is set back by _maxResults amount to get the previous Books
		}else{	if(_startIndex !=0){
				cleanPagination();
				//create the function to handle a click to the newly added PREVIOUS link
				$("#pagination").prepend("<a href='#' id='previous'>Previous</a>");
				$("#previous").click(function() {
					_startIndex =_startIndex - _maxResults;
					requestBooks(_searchText,_startIndex,_maxResults,_searchType,_orderType);
					$('html, body').animate({ scrollTop: 0 }, 'slow'); ////go to the top of the page, smoothly
					event.preventDefault();
		});}
			}
	}
}
