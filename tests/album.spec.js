import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbum method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch the correct URL', () => {
      const album = getAlbum('11BDZR6NRHwPiPy1WQr4Jf');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/11BDZR6NRHwPiPy1WQr4Jf');

        const album2 = getAlbum('07XSN3sPlIlB2L2XNcTwJw')
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/albums/07XSN3sPlIlB2L2XNcTwJw');
    });

    it('hould return correct data from promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('11BDZR6NRHwPiPy1WQr4Jf');
      expect(album.resolveValue).to.be.eql({album: 'name'});
    });
  });

  describe('getAlbums', () => {

    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums('11BDZR6NRHwPiPy1WQr4Jf');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=11BDZR6NRHwPiPy1WQr4Jf');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(['11BDZR6NRHwPiPy1WQr4Jf', '07XSN3sPlIlB2L2XNcTwJw']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {

    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const tracks = getAlbumTracks('11BDZR6NRHwPiPy1WQr4Jf');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/11BDZR6NRHwPiPy1WQr4Jf/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const tracks = getAlbumTracks('11BDZR6NRHwPiPy1WQr4Jf');
      expect(tracks.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
