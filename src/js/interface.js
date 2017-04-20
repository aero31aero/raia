var interface = function(){
	var state = {};
	
	var init = function(){
		state.currentpost=false;
		var languageOverrides = {
		    js: 'javascript',
		    html: 'xml'
		};
		state.markdownparser = markdownit({
	        html: true,
	        highlight: function(code, lang) {
	            if (languageOverrides[lang]) lang = languageOverrides[lang];
	            if (lang && hljs.getLanguage(lang)) {
	                try {
	                    return hljs.highlight(lang, code).value;
	                } catch (e) {}
	            }
	            return '';
	        }
	    })
	    .use(markdownitFootnote);
	    document.getElementById("search-box").value="";
	}

	var addPostTitleInList = function(post){
		var li = document.createElement("li");
		var list = document.getElementById("post-title-list");
		li.innerHTML = post.title;
		li.setAttribute("id",post.path);
		list.appendChild(li);
	}

	var removePostTitlesInList = function(){
		var list = document.getElementById("post-title-list");
		list.innerHTML = "";
	}

	var activatePostTitleInList = function(post){
		if(!post){
			post = state.currentpost;
			if(!post){
				return;
			}
		}
		if(state.currentpost){
			var oldli = document.getElementById(state.currentpost.path);
			if(oldli){
				oldli.classList.remove("active-title");
			}
		}
		var newli = document.getElementById(post.path);
		if(newli){
			newli.classList.add("active-title");
			state.currentpost=post;
		}
	}

	var updatePostTitleInHeader = function(post){
		var date = {};
		date.year = post.date.split("-")[2];
		date.month = post.date.split("-")[1];
		date.day = post.date.split("-")[0];
		var title = "~/";
		title += date.year + "/";
		title += date.month + "/";
		title += date.day + "/";
		title += post.path;
		var titleholder = document.getElementById("post-title");
		titleholder.innerHTML = title;
	}

	var renderPost = function(post,rawpost){
		var articlebody = document.getElementById("article-body");
		articlebody.innerHTML = state.markdownparser.render(rawpost);
	};
	
	return {
		init,
		addPostTitleInList,
		removePostTitlesInList,
		activatePostTitleInList,
		updatePostTitleInHeader,
		renderPost,
	};
}();