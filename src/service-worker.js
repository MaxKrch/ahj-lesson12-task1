import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { 
	clientsClaim, 
	copyResponse, 
	registerQuotaErrorCallback, 
	setCacheNameDetails, 
	skipWaiting
} from 'workbox-core';

import {
	CacheFirst, 
	CacheOnly, 
	NetworkFirst, 
	NetworkOnly, 
	StaleWhileRevalidate, 
	Strategy, 
	StrategyHandler
} from 'workbox-strategies';

self.skipWaiting();
clientsClaim();



precacheAndRoute(self.__WB_MANIFEST);
