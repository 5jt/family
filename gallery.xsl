<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<xsl:stylesheet version="1.0"
		xmlns="http://www.w3.org/1999/xhtml"
		xmlns:html="http://www.w3.org/1999/xhtml"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="xml" omit-xml-declaration="yes"/>
	
	<xsl:param name="cellsPerRow" select="3"/>
	<xsl:param name="myPerson">All</xsl:param>
	
	<xsl:variable name="colWid" select="floor(100 div $cellsPerRow)"/>

	<xsl:variable name="sortedImageIds">
		<!-- used instead of perform-sort in XSLT 2.0 -->
		<xsl:choose>
			<xsl:when test="$myPerson='All'">
				<xsl:for-each select="gallery/images/image">
					<xsl:sort select="year"/>
					<xsl:value-of select="generate-id()"/>
					<xsl-text>; </xsl-text>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="gallery/images/image[person[@pid=$myPerson]]">
					<xsl:sort select="year"/>
					<xsl:value-of select="generate-id()"/>
					<xsl-text>; </xsl-text>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:template match="/">

		<div id="WRAPPER">
		
			<ul id="TOC">
				<!-- 'All' selector --> 
				<xsl:element name="li">
					<xsl:attribute name="onclick">displayResult('All')</xsl:attribute>
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="$myPerson='All'">tocOn</xsl:when>
							<xsl:otherwise>tocOff</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					All
				</xsl:element>
				<!-- person selectors --> 
				<xsl:for-each select="gallery/people/person">
					<xsl:sort select="@id"/>
					<xsl:element name="li">
						<xsl:attribute name="onclick">displayResult('<xsl:value-of select="@id"/>')</xsl:attribute>
						<xsl:attribute name="class">
							<xsl:choose>
								<xsl:when test="$myPerson=@id">tocOn</xsl:when>
								<xsl:otherwise>tocOff</xsl:otherwise>
							</xsl:choose>
						</xsl:attribute>
						<xsl:value-of select="@id"/>
					</xsl:element>
				</xsl:for-each>
			</ul>
			
			<table id="MAIN">
				<tbody>
					<xsl:choose>
						<xsl:when test="$myPerson='All'">
							<xsl:for-each select="gallery/images/image">
								<xsl:sort select="year" />
								<xsl:call-template name="a.row"/>
							</xsl:for-each>
						</xsl:when>
						<xsl:otherwise>
							<xsl:for-each select="gallery/images/image[descendant::person[@pid=$myPerson]]">
								<xsl:sort select="year" />
								<xsl:call-template name="a.row"/>
							</xsl:for-each>
						</xsl:otherwise>
					</xsl:choose>
				</tbody>
			</table>

		</div><!--WRAPPER-->

	</xsl:template>
	
	
	<xsl:template name="a.row">
		<xsl:choose>
			<xsl:when test="$cellsPerRow=1">
				<tr><xsl:apply-templates select="."/></tr>
			</xsl:when>
			<xsl:when test="position() mod $cellsPerRow =1">
				<tr>
					<xsl:call-template name="table.cell">
						<xsl:with-param name="col" select="1"/>
						<xsl:with-param name="gid" select="generate-id()"/>
					</xsl:call-template>
				</tr>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
  
  
	<xsl:template name="table.cell">
		<xsl:param name="col"/>
		<xsl:param name="gid"/>
		<xsl:apply-templates select="/gallery/images/image[generate-id()=$gid]"/>
		<xsl:if test="$col &lt; $cellsPerRow">
			<xsl:call-template name="table.cell">
				<xsl:with-param name="col" select="$col+1"/>
				<xsl:with-param name="gid" select="substring-before(substring-after($sortedImageIds,concat($gid,'; ')),';')"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
  

  
	<xsl:template match="image">
		<xsl:element name="td">
			<xsl:attribute name="style">width: <xsl:value-of select="$colWid"/>%</xsl:attribute>
			<a href="images/{@src}" title="{@src}"><img src="images/thmb/{@src}" alt="{@src}" /></a>
			<xsl:apply-templates select="year"/>
			<xsl:apply-templates select="person"/>
			<xsl:apply-templates select="location"/>
			<xsl:apply-templates select="note"/>
		</xsl:element>
	</xsl:template>


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


	<xsl:template match="*" mode="html">
		<xsl:copy-of select="."/>
	</xsl:template>


</xsl:stylesheet>