<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/">
		<html lang="en-gb">
			<head>
				<link rel="stylesheet" href="gullery.css" type="text/css"/>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
				<script src="gullery.js"> </script>
				<title>Family pictures | 5jt.com</title>
			</head>
			<body>
				<header>
					<h1>Loading…</h1>
				</header>

				<!-- <article style="display: none"> -->
				<article>

					<xsl:for-each select="gallery/images/image">
						<xsl:sort select="year"/>
						<figure class="thumb">
							<img>
								<xsl:attribute name="src">images/<xsl:value-of select="@src"/></xsl:attribute>
							</img>
							<header>
								<xsl:apply-templates select="year"/>
								<xsl:apply-templates select="person"/>
								<xsl:apply-templates select="location"/>
							</header>
							<figcaption>
								<xsl:apply-templates select="note"/>
								<!-- <xsl:apply-templates select="person/[position() > 1]"/> -->
							</figcaption>
						</figure>
					</xsl:for-each>

			</article>

			</body>
		</html>
	</xsl:template>

<!-- 	<xsl:template match="person[@pid and position() = 1]">
		<xsl:value-of select="@pid"/>
	</xsl:template>

	<xsl:template match="person[position() > 1]">
		<xsl:text>, </xsl:text>
		<xsl:value-of select="@pid"/>
	</xsl:template>
 -->
	<xsl:template match="location">
		at 
		<xsl:apply-templates select="@lid"/>
		<xsl:value-of select="."/>
	</xsl:template>

	<xsl:template match="@lid">
		<xsl:variable name="addr" select="/gallery/locations/location[@id=current()]/address" />
		<xsl:element name="span">
			<xsl:attribute name="class">location</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="$addr"/></xsl:attribute>
			<xsl:value-of select="/gallery/locations/location[@id=current()]/caption" />
		</xsl:element>
	</xsl:template>


	<xsl:template match="note">
		<p class="note">
			<xsl:value-of select="@by"/>
			<xsl:text>: </xsl:text>
			<xsl:apply-templates mode="html"/>
		</p>
	</xsl:template>


	<xsl:template match="person">
		<xsl:if test="position() &gt; 1">;</xsl:if>
		<xsl:text> </xsl:text>
		<xsl:choose>
			<xsl:when test="@pid">
				<xsl:apply-templates select="@pid"/>
			</xsl:when>
			<xsl:otherwise>
				<span class="person"><xsl:value-of select="."/></span>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="@pid">
		<xsl:variable name="age" select="../../year - /gallery/people/person[@id=current()]/born/year"/>
		<span class="person">
			<xsl:choose>
				<xsl:when test="../@sure='no'">
					(<xsl:value-of select="."/>, <xsl:value-of select="$age"/>?)
				</xsl:when>
				<xsl:when test="../../year/@sure='no'">
					<xsl:value-of select="."/> (<xsl:value-of select="$age"/>?)
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="."/>, <xsl:value-of select="$age"/>
				</xsl:otherwise>
			</xsl:choose>
		</span>
	</xsl:template>


	<xsl:template match="year">
		<xsl:choose>
			<xsl:when test="@sure='no'"><xsl:value-of select="."/>?</xsl:when>
			<xsl:otherwise><strong><xsl:value-of select="."/></strong></xsl:otherwise>
		</xsl:choose>
		<xsl:text> </xsl:text>
	</xsl:template>


</xsl:stylesheet>
