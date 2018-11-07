        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onSearchQuery={(search,maxResults) => {
              this.searchQuery(search,maxResults)
              history.push('/')
            }}
          />