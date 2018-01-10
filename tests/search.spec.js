import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';


global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke testes', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {

      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {

        const artists = search('Kiss', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Kiss&type=artist');

        const albums = search('Kiss', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Kiss&type=album');

      });

      context('passing two types', () => {

        const artistAlbums = search('Kiss', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Kiss&type=artist,album');
      });
    });

    it('should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Kiss', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('Kiss');
      expect(fetchedStub).to.be.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Kiss');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Kiss&type=artist');
    });
  });

  describe('searchAlbums', () => {

    it('should call fetch function', () => {
      const albums = searchAlbums('Kiss');
      expect(fetchedStub).to.be.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Kiss');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Kiss&type=album');
    });
  });

  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const tracks = searchTracks('Kiss');
      expect(fetchedStub).to.be.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Kiss');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Kiss&type=track');
    });
  });

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {
      const playlists = searchPlaylists('Kiss');
      expect(fetchedStub).to.be.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Kiss');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Kiss&type=playlist');
    });
  });
});
