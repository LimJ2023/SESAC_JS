
-- 1.non_usa_customers
SELECT FirstName ||' '|| LastName as "Full Name",CustomerId, Country
FROM customers
WHERE Country != 'USA';

-- 2. brazil_customers.sql
SELECT FirstName ||' '|| LastName as "Full Name",CustomerId, Country
FROM customers
WHERE Country = 'Brazil';

-- 3.brazil_customers_invoices
SELECT c.FirstName ||' '|| c.LastName as "Full Name", i.InvoiceId, i.InvoiceDate, i.BillingCountry
FROM customers c
JOIN invoices i ON i.CustomerId = c.CustomerId
WHERE c.Country = 'Brazil';

-- 4.sales_agents.
SELECT *
FROM employees
WHERE title LIKE 'Sales%';

-- 5.unique_invoice_countries
SELECT DISTINCT BillingCountry
FROM invoices;

-- 6. sales_agent_invoices
SELECT e.FirstName ||' '|| e.LastName as "Full Name", i.InvoiceId
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON i.CustomerId = c.CustomerId;

-- 7. invoice_totals
SELECT i.*, c.FirstName ||' '|| c.LastName as "customer Full Name", e.FirstName ||' '|| e.LastName as "agent Full Name", c.Country
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON i.CustomerId = c.CustomerId;

-- 8.total_invoices_{year}
SELECT COUNT(*)
FROM invoices
WHERE InvoiceDate BETWEEN '2009-01-01' AND '2011-12-31';

-- 9. total_sales_{year}
SELECT strftime('%Y', InvoiceDate) AS 'YEAR', SUM(total)
FROM invoices
GROUP BY strftime('%Y', InvoiceDate);

-- 10.  invoice_37_line_item_count.
SELECT COUNT(*) as 'lineCount'
FROM invoice_items
where InvoiceId = 37;

-- 11. line_items_per_invoice
SELECT InvoiceId, COUNT(*) as 'lineCount'
FROM invoice_items
GROUP BY InvoiceId;

-- 12.  line_item_track
SELECT i.*, t.name
FROM invoice_items i
JOIN tracks t ON i.TrackId = t.TrackId;

--13. line_item_track_artist.
SELECT i.*, t.name, art.name
FROM invoice_items i
JOIN tracks t ON i.TrackId = t.TrackId
JOIN albums a ON t.AlbumId = a.AlbumId
JOIN artists art ON art.ArtistId = a.ArtistId;

-- 14. country_invoices
SELECT BillingCountry, COUNT(*)
FROM invoices
GROUP BY BillingCountry;

-- 15. playlists_track_count
SELECT p.name, COUNT(t.TrackId)
FROM playlists p
JOIN playlist_track t ON p.PlaylistId = t.PlaylistId
GROUP BY t.PlaylistId;

-- 16. Tracks_no_id
SELECT t.name as 'trackName', a.title as 'album title' , m.name as 'media type' , g.name as 'genres', t.Milliseconds, t.Composer, t.Bytes, t.UnitPrice
FROM tracks t
JOIN albums a ON a.AlbumId = t.AlbumId
JOIN media_types m ON m.MediaTypeId = t.MediaTypeId
JOIN genres g ON g.GenreId = t.GenreId;

-- 17. invoices_line_item_count.
SELECT i.* , COUNT(t.InvoiceLineId) as 'LineCount'
FROM invoices i
JOIN invoice_items t ON i.InvoiceId = t.InvoiceId
GROUP BY t.InvoiceId;

-- 18.  sales_agent_total_sales
SELECT e.EmployeeId, SUM(i.total * (select COUNT(*) from invoices where c.CustomerId = invoices.CustomerId))
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON c.CustomerId = i.CustomerId
GROUP BY e.EmployeeId;

-- 19.  top_2009_agent
SELECT e.EmployeeId, SUM(i.total * (select COUNT(*) from invoices where c.CustomerId = invoices.CustomerId)) as 'total_sales'
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON c.CustomerId = i.CustomerId
WHERE i.InvoiceDate BETWEEN '2009-01-01' AND '2009-12-31'
GROUP BY e.EmployeeId;


-- 20. top_agent.
SELECT e.EmployeeId, SUM(i.total * (select COUNT(*) from invoices where c.CustomerId = invoices.CustomerId)) as 'total_sales'
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
JOIN invoices i ON c.CustomerId = i.CustomerId
WHERE i.InvoiceDate BETWEEN '2009-01-01' AND '2009-12-31'
GROUP BY e.EmployeeId
ORDER BY total_sales DESC
LIMIT 1;

-- 21.sales_agent_customer_count
SELECT e.EmployeeId, COUNT(c.SupportRepId)
FROM employees e
JOIN customers c ON e.EmployeeId = c.SupportRepId
GROUP BY e.EmployeeId;

-- 22. sales_per_country
SELECT BillingCountry, (total * (SELECT COUNT(c.SupportRepId)
						FROM employees e
						JOIN customers c ON e.EmployeeId = c.SupportRepId
						GROUP BY e.EmployeeId)) as "totalCountry"
FROM invoices
ORDER BY "totalCountry" DESC;

-- 23.  top_country
SELECT BillingCountry, MAX(total * (SELECT COUNT(c.SupportRepId)
						FROM employees e
						JOIN customers c ON e.EmployeeId = c.SupportRepId
						GROUP BY e.EmployeeId))
FROM invoices;

--24. top_2013_track 가장 많이 구매한 트랙 구매수 <--어떻게?
SELECT t.name, SUM((SELECT COUNT("")))
FROM tracks t
JOIN invoice_items it ON t.TrackId = it.TrackId
JOIN invoices i ON i.InvoiceId = it.InvoiceId
WHERE strftime('%Y', i.InvoiceDate) = '2013'
GROUP BY t.name;

--25. top_5_tracks.
SELECT t.name, COUNT(*)
FROM tracks t
JOIN invoice_items it ON t.TrackId = it.TrackId
JOIN invoices i ON i.InvoiceId = it.InvoiceId
GROUP BY t.name;

--26.top_3_artists
SELECT art.name, COUNT(*) as 판매수
FROM tracks t
JOIN invoice_items it ON t.TrackId = it.TrackId
JOIN invoices i ON i.InvoiceId = it.InvoiceId
JOIN albums a ON t.AlbumId = a.AlbumId
JOIN artists art ON art.ArtistId = a.ArtistId
GROUP BY art.name
ORDER BY 판매수 DESC
LIMIT 3;

-- 27.top_media_type
SELECT m.name, COUNT(*)
FROM tracks t
JOIN invoice_items it ON t.TrackId = it.TrackId
JOIN invoices i ON i.InvoiceId = it.InvoiceId
JOIN media_types m ON t.MediaTypeId = m.MediaTypeId
GROUP BY m.MediaTypeId;
